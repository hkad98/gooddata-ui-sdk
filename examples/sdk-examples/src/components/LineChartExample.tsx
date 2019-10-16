// (C) 2007-2019 GoodData Corporation
import React from "react";
import { LineChart } from "@gooddata/sdk-ui";
import { newMeasure, newAttribute } from "@gooddata/sdk-model";

import "@gooddata/sdk-ui/styles/css/main.css";

import {
    projectId,
    monthDateIdentifier,
    franchiseFeesIdentifier,
    franchiseFeesAdRoyaltyIdentifier,
    franchiseFeesInitialFranchiseFeeIdentifier,
    franchiseFeesIdentifierOngoingRoyalty,
} from "../utils/fixtures";

import { CUSTOM_COLOR_PALETTE } from "../utils/colors";
import { useBackend } from "../context/auth";

const measures = [
    newMeasure(franchiseFeesIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesAdRoyaltyIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesInitialFranchiseFeeIdentifier, m => m.format("#,##0")),
    newMeasure(franchiseFeesIdentifierOngoingRoyalty, m => m.format("#,##0")),
];

const trendBy = newAttribute(monthDateIdentifier);

const chartConfig = { colorPalette: CUSTOM_COLOR_PALETTE };

const style = { height: 300 };

export const LineChartExample: React.FC = () => {
    const backend = useBackend();

    return (
        <div style={style} className="s-line-chart">
            <LineChart
                backend={backend}
                workspace={projectId}
                measures={measures}
                trendBy={trendBy}
                config={chartConfig}
            />
        </div>
    );
};
