import { google } from "googleapis";
import { Err, Ok, type Result } from "result4js";

import type { Logger } from "../Logger";
import type { OAuthProviders } from "../OAuthProvider";
import { Pagination } from "../Pagination";
import {
    type PlaylistItem,
    playlistItemFromMany,
} from "../entities/playlist-item";
import { LikelyBugError, type YouTubesJsErrors } from "../errors";
import type { NativeClient } from "../types";
import { isNullish, wrapGaxios } from "../utils";

/**
 * A manager of playlist items belonging to a client.
 * Provides methods for `/youtube/v3/playlistItems`
 *
 * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlistItems)
 */
export class PlaylistItemManager {
    private client: NativeClient;
    private logger: Logger;
    private readonly MAX_RESULTS = 50;
    private readonly ALL_PARTS = ["contentDetails", "id", "snippet", "status"];

    constructor({ oauth, logger }: PlaylistItemManagerOptions) {
        this.client = google.youtube({
            version: "v3",
            auth: oauth.getNativeOauth(),
        });
        this.logger = logger.createChild("PlaylistItemManager");
    }

    /**
     * Retrieves a list of playlist items by a playlist ID.
     *
     * - The operation uses 1 quota unit.
     *
     * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/playlistItems/list)
     * @param playlistId
     * @param pageToken
     * @returns
     */
    public async getByPlaylistId(
        playlistId: string,
        pageToken?: string,
    ): Promise<Result<Pagination<PlaylistItem[]>, YouTubesJsErrors>> {
        const rawData = await wrapGaxios(
            this.client.playlistItems.list({
                part: this.ALL_PARTS,
                maxResults: this.MAX_RESULTS,
                playlistId,
                pageToken,
            }),
        );
        if (rawData.isErr()) return Err(rawData.data);
        if (isNullish(rawData.data.items))
            return Err(new LikelyBugError("The raw data is missing items"));
        const items = playlistItemFromMany(rawData.data.items, this.logger);
        if (items.isErr()) return Err(items.data);

        return Ok(
            new Pagination({
                data: items.data,
                logger: this.logger,
                prevToken: rawData.data.prevPageToken,
                nextToken: rawData.data.nextPageToken,
                resultsPerPage: rawData.data.pageInfo?.resultsPerPage,
                totalResults: rawData.data.pageInfo?.totalResults,
                getWithToken: (token) =>
                    this.getByPlaylistId(playlistId, token),
            }),
        );
    }
}

interface PlaylistItemManagerOptions {
    oauth: OAuthProviders;
    logger: Logger;
}
