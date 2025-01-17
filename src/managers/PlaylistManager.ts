import { google } from "googleapis";

import type { OAuthProviders } from "../OAuthProvider";
import { Pagination } from "../Pagination";
import { LIKELY_BUG } from "../constants";
import { Playlist } from "../entities/playlist";
import type { NativeClient } from "../types";

/**
 * Manager for playlist endpoints.
 * Provides methods for `/youtube/v3/playlists`.
 * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlists)
 * @internal
 */
export class PlaylistManager {
    private client: NativeClient;

    constructor(oauth: OAuthProviders) {
        this.client = google.youtube({
            version: "v3",
            auth: oauth.getNativeOauth(),
        });
    }

    /**
     * Fetches the playlists owned by the authenticated user.
     * - This operation uses 1 quota unit.
     * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlists/list)
     * @param pageToken The token for pagination.
     */
    public async getMine(pageToken?: string): Promise<Pagination<Playlist[]>> {
        const rawData = await this.client.playlists.list({
            part: [
                "id",
                "contentDetails",
                "localizations",
                "player",
                "snippet",
                "status",
            ],
            mine: true,
            maxResults: 50,
            pageToken,
        });
        const playlists = rawData.data.items?.map((item) =>
            Playlist.from(item),
        );
        if (!playlists || playlists.some((playlist) => playlist.isErr()))
            throw new Error(LIKELY_BUG);

        return new Pagination({
            data: playlists.map((playlist) => playlist.throwMap(LIKELY_BUG)),
            prevToken: rawData.data.prevPageToken,
            nextToken: rawData.data.nextPageToken,
            resultsPerPage: rawData.data.pageInfo?.resultsPerPage,
            totalResults: rawData.data.pageInfo?.totalResults,
            getWithToken: (token) => this.getMine(token),
        });
    }
}
