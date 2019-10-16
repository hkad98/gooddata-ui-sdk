// (C) 2007-2019 GoodData Corporation
import React, { useState } from "react";
import { BarChart, IChartConfig } from "@gooddata/sdk-ui";
import { newAttribute, newMeasure } from "@gooddata/sdk-model";

import "@gooddata/sdk-ui/styles/css/main.css";

import {
    totalSalesIdentifier,
    locationResortIdentifier,
    menuCategoryAttributeDFIdentifier,
    projectId,
} from "../utils/fixtures";
import { CUSTOM_COLOR_PALETTE } from "../utils/colors";
import { useBackend } from "../context/auth";

interface IBarChartDynamicExampleState {
    config: IChartConfig;
    customPaletteUsed: boolean;
    customLegendUsed: boolean;
    customSeparatorUsed: boolean;
}

const amount = newMeasure(totalSalesIdentifier, m => m.format("#,##0").alias("$ Total Sales"));

const locationResort = newAttribute(locationResortIdentifier);

const menuCategory = newAttribute(menuCategoryAttributeDFIdentifier);

const style = { height: 300 };

export const BarChartDynamicExample: React.FC = () => {
    const backend = useBackend();
    const [{ config }, setState] = useState<IBarChartDynamicExampleState>({
        config: {},
        customPaletteUsed: false,
        customLegendUsed: true,
        customSeparatorUsed: true,
    });

    const onPaletteChange = () =>
        setState(state => {
            const { config: currentConfig, customPaletteUsed } = state;
            return {
                ...state,
                config: {
                    ...currentConfig,
                    colorPalette: customPaletteUsed ? undefined : CUSTOM_COLOR_PALETTE,
                },
                customPaletteUsed: !customPaletteUsed,
            };
        });

    const onLegendChange = () =>
        setState(state => {
            const { config: currentConfig, customLegendUsed } = state;
            return {
                ...state,
                config: {
                    ...currentConfig,
                    legend: {
                        enabled: customLegendUsed,
                        position: "right",
                    },
                },
                customLegendUsed: !customLegendUsed,
            };
        });

    const onSeparatorChange = () =>
        setState(state => {
            const { config: currentConfig, customSeparatorUsed } = state;
            return {
                ...state,
                config: {
                    ...currentConfig,
                    separators: customSeparatorUsed
                        ? { thousand: ".", decimal: "," }
                        : { thousand: ",", decimal: "." },
                },
                customSeparatorUsed: !customSeparatorUsed,
            };
        });

    return (
        <div>
            <div style={style} className="s-bar-chart">
                <button className="s-change-palette" onClick={onPaletteChange}>
                    Change palette
                </button>

                <button className="s-change-legend" onClick={onLegendChange}>
                    Change legend
                </button>

                <button className="s-change-separator" onClick={onSeparatorChange}>
                    Change separator
                </button>

                <BarChart
                    backend={backend}
                    workspace={projectId}
                    measures={[amount]}
                    viewBy={locationResort}
                    stackBy={menuCategory}
                    config={config}
                />
            </div>
        </div>
    );
};
