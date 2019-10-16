// (C) 2019 GoodData Corporation
import React, { createContext, useContext, useEffect } from "react";
import bearFactory from "@gooddata/sdk-backend-bear";
import sdk from "@gooddata/gd-bear-client";

import { GoodDataAuthProvider } from "./GoodDataAuthProvider";
import { IAuthState, IAuthContext, AuthStatus } from "./types";
import { useAuthState } from "./state";

const noop = () => undefined;

const authProvider = new GoodDataAuthProvider();

const backend = bearFactory().withAuthentication(authProvider);

const initialState: IAuthState = {
    authStatus: AuthStatus.AUTHORIZING,
};

const defaultContext: IAuthContext = {
    ...initialState,
    backend,
    login: noop,
    logout: noop,
    register: noop,
};

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider: React.FC = ({ children }) => {
    const {
        onLoginStart,
        onLoginSuccess,
        onLoginError,
        onLogoutStart,
        onLogoutSuccess,
        onLogoutError,
        authStatus,
        authError,
    } = useAuthState(initialState);

    const login = async (username: string, password: string) => {
        onLoginStart();
        try {
            const result = await authProvider.login(username, password);
            onLoginSuccess();
            return result;
        } catch (err) {
            onLoginError(err);
            throw err;
        }
    };

    const logout = async () => {
        onLogoutStart();
        try {
            await sdk.user.logout();
            onLogoutSuccess();
        } catch (err) {
            onLogoutError(err);
            throw err;
        }
    };

    const register = async () => {
        console.log("perform register now");
    };

    useEffect(() => {
        const auth = async () => {
            try {
                await backend.authenticate();
                onLoginSuccess();
            } catch (err) {
                onLoginError(err);
            }
        };

        auth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authStatus,
                authError,
                login,
                logout,
                register,
                backend,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const useBackend = () => {
    const { backend } = useAuth();
    return backend;
};
