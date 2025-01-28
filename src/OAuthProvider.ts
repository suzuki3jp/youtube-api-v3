import { google } from "googleapis";

import type { OAuth2Client } from "./types";

export type OAuthProviders = StaticOAuthProvider;

/**
 * Base class for all OAuth providers
 * @internal
 */
abstract class BaseOAuthProvider {
    abstract getNativeOauth(): OAuth2Client;
}

/**
 * An OAuth provider that doesn't refresh the token
 */
export class StaticOAuthProvider extends BaseOAuthProvider {
    constructor(private readonly credentials: StaticCredentials) {
        super();
    }

    getNativeOauth(): OAuth2Client {
        const oauth = new google.auth.OAuth2();
        oauth.setCredentials({ access_token: this.credentials.accessToken });
        return oauth;
    }
}

/**
 * The credentials for a `StaticOAuthProvider`
 */
export interface StaticCredentials {
    accessToken: string;
}

// TODO: Add `RefreshingOAuthProvider`
