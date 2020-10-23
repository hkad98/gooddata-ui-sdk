// (C) 2020 GoodData Corporation

import { dashboardFilterReferenceObjRef, IWidget } from "@gooddata/sdk-backend-spi";
import {
    filterObjRef,
    IAttributeFilter,
    IDateFilter,
    IFilter,
    isAllTimeDateFilter,
    isAttributeFilter,
    isDateFilter,
    ObjRef,
} from "@gooddata/sdk-model";
import last from "lodash/last";
import zip from "lodash/zip";

type ObjRefNormalizer = (refs: ObjRef[]) => Promise<string[]>;

/**
 * Performs widget filter resolution:
 * - removes all attribute filters hit by ignoreDashboardFilters
 * - removes all date filters for date dimension different than dateDataSet
 * - picks the last date filter for the dateDataSet dimension
 *   - if it is all time, removes all date filters
 *   - otherwise returns the last date filter specified
 *
 * @param widget - widget to resolve filters for
 * @param filters - filters to try
 * @param objRefNormalizer - function providing canonical ref value
 * @internal
 */
export async function resolveWidgetFilters(
    filters: IFilter[],
    ignoreDashboardFilters: IWidget["ignoreDashboardFilters"],
    dateDataSet: IWidget["dateDataSet"],
    objRefNormalizer: ObjRefNormalizer,
): Promise<IFilter[]> {
    const dateFilters = filters.filter(isDateFilter);
    const attributeFilters = filters.filter(isAttributeFilter);

    const isIgnorableFilter = (obj: unknown): obj is IDateFilter | IAttributeFilter =>
        isDateFilter(obj) || isAttributeFilter(obj);

    if (!dateFilters.length && !attributeFilters.length) {
        return filters;
    }

    const [dateFiltersToKeep, attributeFiltersToKeep] = await Promise.all([
        getRelevantDateFiltersForWidget(dateFilters, dateDataSet, objRefNormalizer),
        getRelevantAttributeFiltersForWidget(attributeFilters, ignoreDashboardFilters, objRefNormalizer),
    ]);

    const filtersToKeep = [...dateFiltersToKeep, ...attributeFiltersToKeep];

    // filter the original filter array to maintain order of the items
    return filters.filter((filter) => !isIgnorableFilter(filter) || filtersToKeep.includes(filter));
}

async function getRelevantDateFiltersForWidget(
    filters: IDateFilter[],
    dateDataSet: IWidget["dateDataSet"],
    objRefNormalizer: ObjRefNormalizer,
): Promise<IDateFilter[]> {
    if (!dateDataSet || !filters.length || filters.every(isAllTimeDateFilter)) {
        return [];
    }

    const [dateDatasetUri, ...filterUris] = await objRefNormalizer([
        dateDataSet,
        ...filters.map((filter) => filterObjRef(filter)!),
    ]);

    const withRelevantDimension = zip(filters, filterUris)
        .filter(([, uri]) => dateDatasetUri === uri)
        .map(([filter]) => filter!);

    const candidate = last(withRelevantDimension);
    return !candidate || isAllTimeDateFilter(candidate) ? [] : [candidate];
}

async function getRelevantAttributeFiltersForWidget(
    filters: IAttributeFilter[],
    ignoreDashboardFilters: IWidget["ignoreDashboardFilters"],
    objRefNormalizer: ObjRefNormalizer,
): Promise<IAttributeFilter[]> {
    if (!ignoreDashboardFilters.length || !filters.length) {
        return [];
    }

    // get all the necessary uris in one call by concatenating both arrays
    const uris = await objRefNormalizer([
        ...ignoreDashboardFilters.map(dashboardFilterReferenceObjRef),
        ...filters.map((filter) => filterObjRef(filter)!),
    ]);

    // re-split the uris array to the two parts corresponding to the original arrays
    const divide = ignoreDashboardFilters.length;
    const ignoredUris = uris.slice(0, divide);
    const filterUris = uris.slice(divide);

    return zip(filters, filterUris)
        .filter(([, uri]) => !ignoredUris.includes(uri!))
        .map(([filter]) => filter!);
}
