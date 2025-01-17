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
    private readonly MAX_RESULTS = 50;
    private readonly ALL_PARTS = [
        "id",
        "contentDetails",
        "localizations",
        "player",
        "snippet",
        "status",
    ];

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
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtube.js";
     *
     * const auth = new StaticOAuthProvider({
     *   accessToken: "ACCESS_TOKEN",
     * });
     *
     * const client = new ApiClient(auth);
     * const playlists = await client.playlists.getMine();
     * console.log(playlists.data); // Playlist[]
     * ```
     */
    public async getMine(pageToken?: string): Promise<Pagination<Playlist[]>> {
        const rawData = await this.client.playlists.list({
            part: this.ALL_PARTS,
            mine: true,
            maxResults: this.MAX_RESULTS,
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

    /**
     * Fetches a playlist by its ID.
     * - This operation uses 1 quota unit.
     * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlists/list)
     * @param ids The IDs of the playlist.
     * @param pageToken The token for pagination.
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtube.js";
     *
     * const auth = new StaticOAuthProvider({
     *  accessToken: "ACCESS_TOKEN",
     * });
     * const client = new ApiClient(auth);
     *
     * const playlists = await client.playlists.getByIds(["ID1", "ID2"]);
     * console.log(playlists.data); // [Playlist, Playlist]
     * ```
     */
    public async getByIds(
        ids: string[],
        pageToken?: string,
    ): Promise<Pagination<Playlist[]>> {
        const rawData = await this.client.playlists.list({
            part: this.ALL_PARTS,
            id: ids,
            maxResults: this.MAX_RESULTS,
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
            getWithToken: (token) => this.getByIds(ids, token),
        });
    }

    /**
     * Fetches the playlists of a channel by its ID.
     * - This operation uses 1 quota unit.
     * - Retrieves all playlists when given an authenticated user's channel ID. Otherwise, only public playlists are accessible.
     * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlists/list)
     * @param id The ID of the channel.
     * @param pageToken The token for pagination.
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtube.js";
     *
     * const auth = new StaticOAuthProvider({
     *  accessToken: "ACCESS_TOKEN",
     * });
     * const client = new ApiClient(auth);
     *
     * const playlists = await client.playlists.getByChannelId("CHANNEL_ID");
     * console.log(playlists.data); // Playlist[]
     * ```
     */
    public async getByChannelId(
        id: string,
        pageToken?: string,
    ): Promise<Pagination<Playlist[]>> {
        const rawData = await this.client.playlists.list({
            part: this.ALL_PARTS,
            channelId: id,
            maxResults: this.MAX_RESULTS,
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
            getWithToken: (token) => this.getByChannelId(id, token),
        });
    }

    /**
     * Deletes a playlist by its ID.
     * - This operation uses 50 quota units.
     * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlists/delete)
     * @param playlistId The ID of the playlist.
     */
    public async deleteById(playlistId: string): Promise<void> {
        await this.client.playlists.delete({
            id: playlistId,
        });
    }
}
