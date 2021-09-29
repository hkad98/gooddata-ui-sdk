// (C) 2021 GoodData Corporation

import { DashboardLoadResult, IDashboardLoader } from "./loader";
import {
    IDashboardBaseProps,
    IDashboardEngine,
    IDashboardPlugin,
    IDashboardExtensionProps,
    IDashboardProps,
} from "@gooddata/sdk-ui-dashboard";
import { IAnalyticalBackend, IDashboard } from "@gooddata/sdk-backend-spi";
import {
    IClientWorkspaceIdentifiers,
    resolveLCMWorkspaceIdentifiers,
    ResolvedClientWorkspaceProvider,
} from "@gooddata/sdk-ui";
import { ObjRef } from "@gooddata/sdk-model";
import invariant from "ts-invariant";
import isEmpty from "lodash/isEmpty";
import React from "react";
import { noopDashboardPluginLoader, staticDashboardEngineLoader } from "./staticComponentLoaders";

/**
 * @alpha
 */
export type DashboardEngineLoader = (dashboard: IDashboard) => Promise<IDashboardEngine>;

/**
 * @alpha
 */
export type DashboardPluginsLoader = (dashboard: IDashboard) => Promise<IDashboardPlugin[]>;

/**
 * @alpha
 */
export type DashboardLoaderConfig = {
    /**
     * Specify function that will be used to load an instance of {@link @gooddata/sdk-ui-dashboard#DashboardEngine} to
     * use for rendering dashboard.
     */
    engineLoader: DashboardEngineLoader;

    /**
     * Specify function that will be used to load instances of plugins to integrate with the dashboard engine.
     */
    pluginLoader: DashboardPluginsLoader;
};

/**
 * @alpha
 */
export class DashboardLoader implements IDashboardLoader {
    private readonly config: DashboardLoaderConfig;
    private baseProps: IDashboardBaseProps = {};
    private additionalPlugins: IDashboardPlugin[] = [];
    private clientWorkspace: IClientWorkspaceIdentifiers | undefined = undefined;

    private constructor(config: DashboardLoaderConfig) {
        this.config = config;
    }

    public static dev(): DashboardLoader {
        return new DashboardLoader({
            engineLoader: staticDashboardEngineLoader,
            pluginLoader: noopDashboardPluginLoader,
        });
    }

    public static prod(): DashboardLoader {
        // TODO: implement runtime-loaders & integrate them here
        throw new Error("not implemented");
    }

    public onBackend = (backend: IAnalyticalBackend): IDashboardLoader => {
        this.baseProps.backend = backend;

        return this;
    };

    public fromClientWorkspace = (clientWorkspace: IClientWorkspaceIdentifiers): IDashboardLoader => {
        this.clientWorkspace = clientWorkspace;
        this.baseProps.workspace = undefined;

        return this;
    };

    public fromWorkspace = (workspace: string): IDashboardLoader => {
        this.baseProps.workspace = workspace;
        this.clientWorkspace = undefined;

        return this;
    };

    public forDashboard = (dashboardRef: ObjRef): IDashboardLoader => {
        this.baseProps.dashboardRef = dashboardRef;
        return this;
    };

    public withAdditionalPlugins = (...plugins: IDashboardPlugin[]): IDashboardLoader => {
        this.additionalPlugins = plugins ?? [];

        return this;
    };

    public withBaseProps = (props: IDashboardBaseProps): IDashboardLoader => {
        this.baseProps = { ...props };

        return this;
    };

    private resolveWorkspace = async (
        backend: IAnalyticalBackend,
    ): Promise<[string | undefined, IClientWorkspaceIdentifiers | undefined]> => {
        if (!this.clientWorkspace) {
            return [this.baseProps.workspace, undefined];
        }

        const resolvedClientWorkspace = await resolveLCMWorkspaceIdentifiers(backend, this.clientWorkspace);
        invariant(
            !isEmpty(resolvedClientWorkspace),
            "DashboardLoader was not able to resolve LCM client workspace to actual workspace.",
        );

        return [resolvedClientWorkspace.workspace, resolvedClientWorkspace];
    };

    public load = async (): Promise<DashboardLoadResult> => {
        const { backend, dashboardRef } = this.baseProps;

        invariant(backend, "DashboardLoader is not configured with an instance of Analytical Backend.");
        invariant(dashboardRef, "DashboardLoader is not configured with dashboard to load.");

        const [workspace, clientWorkspace] = await this.resolveWorkspace(backend);
        invariant(workspace, "DashboardLoader is not configured with workspace to use and loader.");

        const dashboard = await backend.workspace(workspace).dashboards().getDashboard(dashboardRef);
        const { engineLoader, pluginLoader } = this.config;

        const engine = await engineLoader(dashboard);
        const plugins = await pluginLoader(dashboard);

        const allPlugins = [...plugins, ...this.additionalPlugins];
        const extensionProps: IDashboardExtensionProps = engine.initializePlugins(allPlugins);
        const props: IDashboardProps = {
            ...this.baseProps,
            ...extensionProps,
            workspace,
        };

        /*
         * if user specifies workspace using client workspace identifiers (data product & client), then the loader
         * must ensure that the actual dashboard component is rendered in the ClientWorkspace context. The dashboard
         * component is aware of this context and has some special logic in place for this occasion.
         */
        const DashboardComponent = !clientWorkspace
            ? engine.getDashboardComponent()
            : clientWorkspaceDashboardFactory(engine.getDashboardComponent(), clientWorkspace);

        return {
            engine,
            plugins: allPlugins,
            DashboardComponent,
            props,
        };
    };
}

function clientWorkspaceDashboardFactory(
    Component: React.ComponentType<IDashboardProps>,
    clientWorkspace: IClientWorkspaceIdentifiers,
): React.FC<IDashboardProps> {
    function ClientWorkspaceDashboardWrapper(props: IDashboardProps) {
        return (
            <ResolvedClientWorkspaceProvider {...clientWorkspace}>
                <Component {...props} />
            </ResolvedClientWorkspaceProvider>
        );
    }

    return ClientWorkspaceDashboardWrapper;
}
