// (C) 2019-2024 GoodData Corporation
import React from "react";
import ConfigSection from "../ConfigSection.js";
import ForecastConfidenceControl from "./ForecastConfidenceControl.js";
import { IVisualizationProperties } from "../../../interfaces/Visualization.js";
import InputControl from "../InputControl.js";
import { messages } from "../../../../locales.js";
import noop from "lodash/noop.js";
import CheckboxControl from "../CheckboxControl.js";

export interface IForecastSection {
    controlsDisabled: boolean;
    enabled: boolean;
    properties: IVisualizationProperties;
    propertiesMeta: any;
    defaultForecastEnabled?: boolean;
    pushData: (data: any) => any;
}

class ForecastSection extends React.PureComponent<IForecastSection> {
    public static defaultProps: IForecastSection = {
        controlsDisabled: false,
        enabled: false,
        properties: {},
        propertiesMeta: {},
        defaultForecastEnabled: true,
        pushData: noop,
    };

    public render() {
        const { controlsDisabled, properties, pushData, defaultForecastEnabled, enabled } = this.props;

        const forecastEnabled = this.props.properties?.controls?.forecast?.enabled ?? defaultForecastEnabled;
        const forecastConfidence = this.props.properties?.controls?.forecast?.confidence ?? "95";
        const forecastPeriod = this.props.properties?.controls?.forecast?.period ?? 3;
        const forecastSeasonal = this.props.properties?.controls?.forecast?.seasonal ?? false;
        const forecastToggleDisabledByVisualization = !(this.props.propertiesMeta?.forecast_enabled ?? true);

        const toggleDisabled = controlsDisabled || forecastToggleDisabledByVisualization || !enabled;
        const forecastControlsDisabled = !forecastEnabled || toggleDisabled;
        const showDisabledMessage = controlsDisabled || forecastToggleDisabledByVisualization || !enabled;

        return (
            <ConfigSection
                id="forecast_section"
                valuePath="forecast.enabled"
                title={messages.forecastTitle.id}
                propertiesMeta={this.props.propertiesMeta}
                properties={properties}
                canBeToggled={true}
                toggleDisabled={toggleDisabled}
                toggledOn={forecastEnabled}
                pushData={pushData}
                showDisabledMessage={showDisabledMessage}
                toggleMessageId={messages.forecastDisabledTooltip.id}
            >
                <InputControl
                    value={forecastPeriod}
                    valuePath="forecast.period"
                    labelText={messages.forecastPeriod.id}
                    placeholder={messages.forecastPeriodPlaceholder.id}
                    disabled={forecastControlsDisabled}
                    properties={properties}
                    pushData={pushData}
                />
                <ForecastConfidenceControl
                    disabled={forecastControlsDisabled}
                    value={forecastConfidence}
                    showDisabledMessage={showDisabledMessage}
                    properties={properties}
                    pushData={pushData}
                />
                <CheckboxControl
                    valuePath="forecast.seasonal"
                    checked={forecastSeasonal}
                    labelText={messages.forecastSeasonal.id}
                    disabled={forecastControlsDisabled}
                    properties={properties}
                    pushData={pushData}
                />
            </ConfigSection>
        );
    }
}

export default ForecastSection;
