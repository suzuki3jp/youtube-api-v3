import { type LogLevel, Logger } from "./Logger";
import type { OAuthProviders } from "./OAuthProvider";
import { PlaylistManager } from "./managers/PlaylistManager";

/**
 * The main class for interacting with the YouTube Data API.
 */
export class ApiClient {
    /**
     * The manager for playlists.
     * Provides methods for fetching and manipulating playlists.
     */
    public playlists: PlaylistManager;

    private oauth: OAuthProviders;
    private logger: Logger;
    constructor({ oauth, logLevel = "ERROR" }: ApiClientOptions) {
        this.oauth = oauth;
        this.logger = new Logger({ name: "YOUTUBE.JS", level: logLevel });
        this.playlists = new PlaylistManager({
            oauth: this.oauth,
            logger: this.logger,
        });
    }
}

export interface ApiClientOptions {
    /**
     * The OAuth providers to use.
     */
    oauth: OAuthProviders;

    /**
     * The log level for the client.
     */
    logLevel?: LogLevel;
}
