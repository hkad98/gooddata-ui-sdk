// (C) 2022 GoodData Corporation

/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from "./configuration";
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from "axios";
// Some imports not used depending on template conditions, we also need prettier-ignore so that the import does not get split and ts-ignore still works
// prettier-ignore
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// Some imports not used depending on template conditions, we also need prettier-ignore so that the import does not get split and ts-ignore still works
// prettier-ignore
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * Entity representing user in authentication system.
 * @export
 * @interface AuthUser
 */
export interface AuthUser {
    /**
     * Email - used as lookup (must be unique). For PUT method, it must be same as in URL
     * @type {string}
     * @memberof AuthUser
     */
    email: string;
    /**
     * User password. It is not returned by GET method.
     * @type {string}
     * @memberof AuthUser
     */
    password?: string;
    /**
     * User description, which will be visible in application.
     * @type {string}
     * @memberof AuthUser
     */
    displayName: string;
    /**
     * Field, which should be stored in metadata in authenticationId field. In PUT and POST method it must be not present, or equal to value calculated by backend (e.g. returned from previous GET).
     * @type {string}
     * @memberof AuthUser
     */
    authenticationId?: string;
}
/**
 *
 * @export
 * @interface FeatureFlagsContext
 */
export interface FeatureFlagsContext {
    /**
     *
     * @type {string}
     * @memberof FeatureFlagsContext
     */
    earlyAccess: string;
}
/**
 * Base Structure for feature flags
 * @export
 * @interface Features
 */
export interface Features {
    /**
     *
     * @type {FeatureFlagsContext}
     * @memberof Features
     */
    context: FeatureFlagsContext;
}
/**
 *
 * @export
 * @interface LiveFeatureFlagConfiguration
 */
export interface LiveFeatureFlagConfiguration {
    /**
     *
     * @type {string}
     * @memberof LiveFeatureFlagConfiguration
     */
    host: string;
    /**
     *
     * @type {string}
     * @memberof LiveFeatureFlagConfiguration
     */
    key: string;
}
/**
 * Structure for featureHub
 * @export
 * @interface LiveFeatures
 */
export interface LiveFeatures {
    /**
     *
     * @type {FeatureFlagsContext}
     * @memberof LiveFeatures
     */
    context: FeatureFlagsContext;
    /**
     *
     * @type {LiveFeatureFlagConfiguration}
     * @memberof LiveFeatures
     */
    configuration: LiveFeatureFlagConfiguration;
}
/**
 *
 * @export
 * @interface LiveFeaturesAllOf
 */
export interface LiveFeaturesAllOf {
    /**
     *
     * @type {LiveFeatureFlagConfiguration}
     * @memberof LiveFeaturesAllOf
     */
    configuration?: LiveFeatureFlagConfiguration;
}
/**
 *
 * @export
 * @interface Profile
 */
export interface Profile {
    /**
     *
     * @type {string}
     * @memberof Profile
     */
    organizationId: string;
    /**
     *
     * @type {string}
     * @memberof Profile
     */
    organizationName: string;
    /**
     *
     * @type {string}
     * @memberof Profile
     */
    name?: string;
    /**
     *
     * @type {string}
     * @memberof Profile
     */
    userId: string;
    /**
     *
     * @type {Telemetry}
     * @memberof Profile
     */
    telemetry?: Telemetry;
    /**
     *
     * @type {ProfileLinks}
     * @memberof Profile
     */
    links: ProfileLinks;
    /**
     *
     * @type {LiveFeatures | StaticFeatures}
     * @memberof Profile
     */
    features: LiveFeatures | StaticFeatures;
}
/**
 *
 * @export
 * @interface ProfileLinks
 */
export interface ProfileLinks {
    /**
     *
     * @type {string}
     * @memberof ProfileLinks
     */
    self: string;
    /**
     *
     * @type {string}
     * @memberof ProfileLinks
     */
    organization: string;
    /**
     *
     * @type {string}
     * @memberof ProfileLinks
     */
    user: string;
}
/**
 * Structure for offline feature flag
 * @export
 * @interface StaticFeatures
 */
export interface StaticFeatures {
    /**
     *
     * @type {FeatureFlagsContext}
     * @memberof StaticFeatures
     */
    context: FeatureFlagsContext;
    /**
     *
     * @type {{ [key: string]: string; }}
     * @memberof StaticFeatures
     */
    items: { [key: string]: string };
}
/**
 *
 * @export
 * @interface StaticFeaturesAllOf
 */
export interface StaticFeaturesAllOf {
    /**
     *
     * @type {{ [key: string]: string; }}
     * @memberof StaticFeaturesAllOf
     */
    items?: { [key: string]: string };
}
/**
 *
 * @export
 * @interface Telemetry
 */
export interface Telemetry {
    /**
     *
     * @type {string}
     * @memberof Telemetry
     */
    host: string;
    /**
     *
     * @type {number}
     * @memberof Telemetry
     */
    siteId: number;
    /**
     *
     * @type {string}
     * @memberof Telemetry
     */
    deploymentId: string;
    /**
     *
     * @type {string}
     * @memberof Telemetry
     */
    organizationHash: string;
    /**
     *
     * @type {string}
     * @memberof Telemetry
     */
    userHash: string;
}

/**
 * AuthenticationApi - axios parameter creator
 * @export
 */
export const AuthenticationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {AuthUser} authUser
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (authUser: AuthUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'authUser' is not null or undefined
            assertParamExists("createUser", "authUser", authUser);
            const localVarPath = `/api/v1/auth/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter["Content-Type"] = "application/json";

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };
            const needsSerialization =
                typeof authUser !== "string" ||
                localVarRequestOptions.headers["Content-Type"] === "application/json";
            localVarRequestOptions.data = needsSerialization
                ? JSON.stringify(authUser !== undefined ? authUser : {})
                : authUser || "";

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {string} userEmail
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser: async (userEmail: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userEmail' is not null or undefined
            assertParamExists("deleteUser", "userEmail", userEmail);
            const localVarPath = `/api/v1/auth/users/{userEmail}`.replace(
                `{${"userEmail"}}`,
                encodeURIComponent(String(userEmail)),
            );
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/profile`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {string} userEmail
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (userEmail: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userEmail' is not null or undefined
            assertParamExists("getUser", "userEmail", userEmail);
            const localVarPath = `/api/v1/auth/users/{userEmail}`.replace(
                `{${"userEmail"}}`,
                encodeURIComponent(String(userEmail)),
            );
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/auth/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {string} userEmail
         * @param {AuthUser} authUser
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (
            userEmail: string,
            authUser: AuthUser,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'userEmail' is not null or undefined
            assertParamExists("updateUser", "userEmail", userEmail);
            // verify required parameter 'authUser' is not null or undefined
            assertParamExists("updateUser", "authUser", authUser);
            const localVarPath = `/api/v1/auth/users/{userEmail}`.replace(
                `{${"userEmail"}}`,
                encodeURIComponent(String(userEmail)),
            );
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter["Content-Type"] = "application/json";

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };
            const needsSerialization =
                typeof authUser !== "string" ||
                localVarRequestOptions.headers["Content-Type"] === "application/json";
            localVarRequestOptions.data = needsSerialization
                ? JSON.stringify(authUser !== undefined ? authUser : {})
                : authUser || "";

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};

/**
 * AuthenticationApi - functional programming interface
 * @export
 */
export const AuthenticationApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthenticationApiAxiosParamCreator(configuration);
    return {
        /**
         *
         * @param {AuthUser} authUser
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(
            authUser: AuthUser,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthUser>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(authUser, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @param {string} userEmail
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(
            userEmail: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(userEmail, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProfile(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Profile>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProfile(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @param {string} userEmail
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(
            userEmail: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthUser>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(userEmail, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUsers(
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AuthUser>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUsers(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         *
         * @param {string} userEmail
         * @param {AuthUser} authUser
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(
            userEmail: string,
            authUser: AuthUser,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthUser>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(
                userEmail,
                authUser,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};

/**
 * AuthenticationApi - factory interface
 * @export
 */
export const AuthenticationApiFactory = function (
    configuration?: Configuration,
    basePath?: string,
    axios?: AxiosInstance,
) {
    const localVarFp = AuthenticationApiFp(configuration);
    return {
        /**
         *
         * @param {AuthenticationApiCreateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(
            requestParameters: AuthenticationApiCreateUserRequest,
            options?: AxiosRequestConfig,
        ): AxiosPromise<AuthUser> {
            return localVarFp
                .createUser(requestParameters.authUser, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {AuthenticationApiDeleteUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(
            requestParameters: AuthenticationApiDeleteUserRequest,
            options?: AxiosRequestConfig,
        ): AxiosPromise<void> {
            return localVarFp
                .deleteUser(requestParameters.userEmail, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile(options?: AxiosRequestConfig): AxiosPromise<Profile> {
            return localVarFp.getProfile(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {AuthenticationApiGetUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(
            requestParameters: AuthenticationApiGetUserRequest,
            options?: AxiosRequestConfig,
        ): AxiosPromise<AuthUser> {
            return localVarFp
                .getUser(requestParameters.userEmail, options)
                .then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers(options?: AxiosRequestConfig): AxiosPromise<Array<AuthUser>> {
            return localVarFp.getUsers(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {AuthenticationApiUpdateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(
            requestParameters: AuthenticationApiUpdateUserRequest,
            options?: AxiosRequestConfig,
        ): AxiosPromise<AuthUser> {
            return localVarFp
                .updateUser(requestParameters.userEmail, requestParameters.authUser, options)
                .then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthenticationApi - interface
 * @export
 * @interface AuthenticationApi
 */
export interface AuthenticationApiInterface {
    /**
     *
     * @param {AuthenticationApiCreateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    createUser(
        requestParameters: AuthenticationApiCreateUserRequest,
        options?: AxiosRequestConfig,
    ): AxiosPromise<AuthUser>;

    /**
     *
     * @param {AuthenticationApiDeleteUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    deleteUser(
        requestParameters: AuthenticationApiDeleteUserRequest,
        options?: AxiosRequestConfig,
    ): AxiosPromise<void>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    getProfile(options?: AxiosRequestConfig): AxiosPromise<Profile>;

    /**
     *
     * @param {AuthenticationApiGetUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    getUser(
        requestParameters: AuthenticationApiGetUserRequest,
        options?: AxiosRequestConfig,
    ): AxiosPromise<AuthUser>;

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    getUsers(options?: AxiosRequestConfig): AxiosPromise<Array<AuthUser>>;

    /**
     *
     * @param {AuthenticationApiUpdateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApiInterface
     */
    updateUser(
        requestParameters: AuthenticationApiUpdateUserRequest,
        options?: AxiosRequestConfig,
    ): AxiosPromise<AuthUser>;
}

/**
 * Request parameters for createUser operation in AuthenticationApi.
 * @export
 * @interface AuthenticationApiCreateUserRequest
 */
export interface AuthenticationApiCreateUserRequest {
    /**
     *
     * @type {AuthUser}
     * @memberof AuthenticationApiCreateUser
     */
    readonly authUser: AuthUser;
}

/**
 * Request parameters for deleteUser operation in AuthenticationApi.
 * @export
 * @interface AuthenticationApiDeleteUserRequest
 */
export interface AuthenticationApiDeleteUserRequest {
    /**
     *
     * @type {string}
     * @memberof AuthenticationApiDeleteUser
     */
    readonly userEmail: string;
}

/**
 * Request parameters for getUser operation in AuthenticationApi.
 * @export
 * @interface AuthenticationApiGetUserRequest
 */
export interface AuthenticationApiGetUserRequest {
    /**
     *
     * @type {string}
     * @memberof AuthenticationApiGetUser
     */
    readonly userEmail: string;
}

/**
 * Request parameters for updateUser operation in AuthenticationApi.
 * @export
 * @interface AuthenticationApiUpdateUserRequest
 */
export interface AuthenticationApiUpdateUserRequest {
    /**
     *
     * @type {string}
     * @memberof AuthenticationApiUpdateUser
     */
    readonly userEmail: string;

    /**
     *
     * @type {AuthUser}
     * @memberof AuthenticationApiUpdateUser
     */
    readonly authUser: AuthUser;
}

/**
 * AuthenticationApi - object-oriented interface
 * @export
 * @class AuthenticationApi
 * @extends {BaseAPI}
 */
export class AuthenticationApi extends BaseAPI implements AuthenticationApiInterface {
    /**
     *
     * @param {AuthenticationApiCreateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public createUser(requestParameters: AuthenticationApiCreateUserRequest, options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .createUser(requestParameters.authUser, options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {AuthenticationApiDeleteUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public deleteUser(requestParameters: AuthenticationApiDeleteUserRequest, options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .deleteUser(requestParameters.userEmail, options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public getProfile(options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .getProfile(options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {AuthenticationApiGetUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public getUser(requestParameters: AuthenticationApiGetUserRequest, options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .getUser(requestParameters.userEmail, options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public getUsers(options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .getUsers(options)
            .then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {AuthenticationApiUpdateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public updateUser(requestParameters: AuthenticationApiUpdateUserRequest, options?: AxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration)
            .updateUser(requestParameters.userEmail, requestParameters.authUser, options)
            .then((request) => request(this.axios, this.basePath));
    }
}
