// (C) 2019-2022 GoodData Corporation
import {
    IWorkspaceMeasuresService,
    IMeasureExpressionToken,
    IMeasureMetadataObject,
    IMeasureMetadataObjectDefinition,
    IMeasureReferencing,
    ICatalogMeasure,
} from "@gooddata/sdk-backend-spi";
import {
    JsonApiAttributeOut,
    JsonApiFactOut,
    JsonApiLabelOut,
    JsonApiMetricOut,
    JsonApiMetricOutDocument,
    jsonApiHeaders,
    JsonApiMetricInTypeEnum,
    MetadataUtilities,
    ITigerClient,
} from "@gooddata/api-client-tiger";
import { ObjRef, idRef, isIdentifierRef, areObjRefsEqual } from "@gooddata/sdk-model";
import { convertMetricFromBackend } from "../../../convertors/fromBackend/MetricConverter";
import { convertMeasure } from "../../../convertors/fromBackend/CatalogConverter";
import { convertMetricToBackend } from "../../../convertors/toBackend/MetricConverter";
import { TigerAuthenticatedCallGuard } from "../../../types";
import { objRefToIdentifier } from "../../../utils/api";
import { tokenizeExpression, IExpressionToken } from "./measureExpressionTokens";
import { v4 as uuidv4 } from "uuid";
import { visualizationObjectsItemToInsight } from "../../../convertors/fromBackend/InsightConverter";

/**
 * Max filter length is calculated from the maximal length of the URL (2048 characters) and
 * its query parameters (1024 characters). As we can expect there are others query params,
 * filter parameter length specified as below.
 */
const MAX_FILTER_LENGTH = 800;
export class TigerWorkspaceMeasures implements IWorkspaceMeasuresService {
    constructor(private readonly authCall: TigerAuthenticatedCallGuard, public readonly workspace: string) {}

    public async getMeasureExpressionTokens(ref: ObjRef): Promise<IMeasureExpressionToken[]> {
        if (!isIdentifierRef(ref)) {
            throw new Error("only identifiers supported");
        }

        const metricMetadata = await this.authCall((client) =>
            client.entities.getEntityMetrics(
                {
                    objectId: ref.identifier,
                    workspaceId: this.workspace,
                },
                {
                    headers: jsonApiHeaders,
                    query: { include: "facts,metrics,attributes,labels" },
                },
            ),
        );
        const metric = metricMetadata.data;
        const maql = metric.data.attributes!.content!.maql || "";

        const regexTokens = tokenizeExpression(maql);
        return regexTokens.map((regexToken) => this.resolveToken(regexToken, metric));
    }

    private resolveToken(
        regexToken: IExpressionToken,
        metric: JsonApiMetricOutDocument,
    ): IMeasureExpressionToken {
        if (
            regexToken.type === "text" ||
            regexToken.type === "quoted_text" ||
            regexToken.type === "comment" ||
            regexToken.type === "number" ||
            regexToken.type === "bracket"
        ) {
            return { type: regexToken.type, value: regexToken.value };
        }
        const [type, id] = regexToken.value.split("/");
        if (type === "metric" || type === "fact" || type === "attribute" || type === "label") {
            return this.resolveObjectToken(id, type, metric.included || [], metric.data.id);
        }
        throw new Error(`Cannot resolve title of object type ${type}`);
    }

    private resolveObjectToken(
        objectId: string,
        objectType: "metric" | "fact" | "attribute" | "label",
        includedObjects: ReadonlyArray<any>,
        identifier: string,
    ): IMeasureExpressionToken {
        const includedObject = includedObjects.find((includedObject) => {
            return includedObject.id === objectId && includedObject.type === objectType;
        }) as JsonApiMetricOut | JsonApiLabelOut | JsonApiAttributeOut | JsonApiFactOut;

        interface ITypeMapping {
            [tokenObjectType: string]: IMeasureExpressionToken["type"];
        }
        const typeMapping: ITypeMapping = {
            metric: "measure",
            fact: "fact",
            attribute: "attribute",
            label: "attribute",
        };

        const value = includedObject?.attributes?.title || `${objectType}/${objectId}`;
        return {
            type: typeMapping[objectType],
            value,
            id: objectId,
            ref: idRef(identifier),
        };
    }

    async createMeasure(measure: IMeasureMetadataObjectDefinition): Promise<IMeasureMetadataObject> {
        const metricAttributes = convertMetricToBackend(measure);
        const result = await this.authCall((client) => {
            return client.entities.createEntityMetrics(
                {
                    workspaceId: this.workspace,
                    jsonApiMetricInDocument: {
                        data: {
                            id: measure.id || uuidv4(),
                            type: JsonApiMetricInTypeEnum.Metric,
                            attributes: metricAttributes,
                        },
                    },
                },
                {
                    headers: jsonApiHeaders,
                },
            );
        });

        return convertMetricFromBackend(result.data);
    }

    async updateMeasure(measure: IMeasureMetadataObject): Promise<IMeasureMetadataObject> {
        const objectId = await objRefToIdentifier(measure.ref, this.authCall);
        const metricAttributes = convertMetricToBackend(measure);
        const result = await this.authCall((client) => {
            return client.entities.updateEntityMetrics(
                {
                    objectId,
                    workspaceId: this.workspace,
                    jsonApiMetricInDocument: {
                        data: {
                            id: objectId,
                            type: JsonApiMetricInTypeEnum.Metric,
                            attributes: metricAttributes,
                        },
                    },
                },
                {
                    headers: jsonApiHeaders,
                },
            );
        });

        return convertMetricFromBackend(result.data);
    }

    async deleteMeasure(measureRef: ObjRef): Promise<void> {
        const objectId = await objRefToIdentifier(measureRef, this.authCall);

        await this.authCall((client) => {
            return client.entities.deleteEntityMetrics({
                objectId,
                workspaceId: this.workspace,
            });
        });
    }

    public getMeasureReferencingObjects = async (ref: ObjRef): Promise<IMeasureReferencing> => {
        const id = await objRefToIdentifier(ref, this.authCall);
        const filterReferencingObj = {
            filter: `metrics.id==${id}`, // RSQL format of querying data
        };

        const insights = this.authCall((client) =>
            MetadataUtilities.getAllPagesOf(
                client,
                client.entities.getAllEntitiesVisualizationObjects,
                {
                    workspaceId: this.workspace,
                },
                { query: filterReferencingObj as any }, // return only visualizationObjects that have a link to the given measure
            )
                .then(MetadataUtilities.mergeEntitiesResults)
                .then((insights) => insights.data.map(visualizationObjectsItemToInsight)),
        );

        const measures = this.authCall((client) =>
            MetadataUtilities.getAllPagesOf(
                client,
                client.entities.getAllEntitiesMetrics,
                {
                    workspaceId: this.workspace,
                    include: ["metrics"],
                },
                { query: filterReferencingObj as any }, // return only measures that have a link to the given  measure
            )
                .then(MetadataUtilities.mergeEntitiesResults)
                .then((measures) => measures.data.map(convertMetricFromBackend)),
        );

        const request = Promise.all([insights, measures]);
        return request.then(([insights, measures]) => {
            return {
                insights,
                measures,
            };
        });
    };

    public getCatalogMeasures = async (measureRefs: ObjRef[]): Promise<ICatalogMeasure[]> => {
        return this.authCall(async (client) => {
            const allMetrics = await loadMetrics(client, this.authCall, measureRefs, this.workspace);

            return allMetrics.filter((metric) =>
                measureRefs.find((metricRef) => areObjRefsEqual(metricRef, metric.measure.ref)),
            );
        });
    };
}

function loadMetrics(
    client: ITigerClient,
    authCall: TigerAuthenticatedCallGuard,
    measureRefs: ObjRef[],
    workspaceId: string,
): Promise<ICatalogMeasure[]> {
    const filter = measureRefs
        .map(async (ref) => {
            const id = await objRefToIdentifier(ref, authCall);
            return `metrics.id==${id}`;
        })
        .join(",");

    /**
     * The RSQL filter will be omitted if its length is too long to be used
     * as a query parameter.
     */
    const rsqlFilter = filter.length < MAX_FILTER_LENGTH ? filter : undefined;

    return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesMetrics, {
        workspaceId,
        filter: rsqlFilter,
    })
        .then(MetadataUtilities.mergeEntitiesResults)
        .then((measures) => measures.data.map(convertMeasure));
}
