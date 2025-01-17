import type { OAuthProviders } from "./OAuthProvider";
import { PlaylistManager } from "./managers/PlaylistManager";

export class ApiClient {
    /**
     * The manager for playlists.
     * Provides methods for fetching and manipulating playlists.
     */
    public playlists: PlaylistManager;

    constructor(private oauth: OAuthProviders) {
        this.playlists = new PlaylistManager(this.oauth);
    }
}
