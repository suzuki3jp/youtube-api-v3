import { google } from "googleapis";
import { type Result, err, ok } from "neverthrow";

import type { Logger } from "../Logger";
import type { OAuthProviders } from "../OAuthProvider";
import { Pagination } from "../Pagination";
import {
    type PlaylistItem,
    playlistItemFrom,
    playlistItemFromMany,
} from "../entities/playlist-item";
import { LikelyBugError, type YouTubesJsErrors } from "../errors";
import type { NativeClient } from "../types";
import { isNullish, wrapGaxios } from "../utils";

/**
 * A manager of playlist items belonging to a client.
 * Provides methods for `/youtube/v3/playlistItems`
 *
 * {@link https://developers.google.com/youtube/v3/docs/playlistItems | YouTube Data API Reference}
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
     * @remarks The operation uses 1 quota unit.
     *
     * {@link https://developers.google.com/youtube/v3/docs/playlistItems/list | YouTube Data API Reference}
     * @param playlistId - The ID of the playlist to retrieve items from.
     * @param pageToken - The page token to use for pagination.
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
        if (rawData.isErr()) return err(rawData.error);
        if (isNullish(rawData.value.items))
            return err(new LikelyBugError("The raw data is missing items"));
        const items = playlistItemFromMany(rawData.value.items, this.logger);
        if (items.isErr()) return err(items.error);

        return ok(
            new Pagination({
                data: items.value,
                logger: this.logger,
                prevToken: rawData.value.prevPageToken,
                nextToken: rawData.value.nextPageToken,
                resultsPerPage: rawData.value.pageInfo?.resultsPerPage,
                totalResults: rawData.value.pageInfo?.totalResults,
                getWithToken: (token) =>
                    this.getByPlaylistId(playlistId, token),
            }),
        );
    }

    /**
     * Adds a item to a playlist.
     * @remarks The operation uses 50 quota units.
     * @param options - The options to create a playlist item.
     * @returns - The created playlist item.
     */
    public async create(
        options: CreatePlaylistItemOptions,
    ): Promise<Result<PlaylistItem, YouTubesJsErrors>> {
        const { playlistId, videoId, position } = options;

        const rawData = await wrapGaxios(
            this.client.playlistItems.insert({
                part: this.ALL_PARTS,
                requestBody: {
                    snippet: {
                        playlistId,
                        resourceId: {
                            kind: "youtube#video",
                            videoId,
                        },
                        position,
                    },
                },
            }),
        );
        if (rawData.isErr()) return err(rawData.error);
        const item = playlistItemFrom(rawData.value, this.logger);
        if (item.isErr()) return err(item.error);

        return ok(item.value);
    }

    /**
     * Deletes a playlist item by its ID.
     * @param id - The ID of the playlist item to delete.
     */
    public async deleteById(
        id: string,
    ): Promise<Result<undefined, YouTubesJsErrors>> {
        const rawData = await wrapGaxios(
            this.client.playlistItems.delete({
                id,
            }),
        );
        if (rawData.isErr()) return err(rawData.error);

        return ok(undefined);
    }
}

interface PlaylistItemManagerOptions {
    oauth: OAuthProviders;
    logger: Logger;
}

export interface CreatePlaylistItemOptions {
    /**
     * The ID of the playlist to add the item to.
     */
    playlistId: string;

    /**
     * The ID of the video to add to the playlist.
     */
    videoId: string;

    /**
     * The position of the item in the playlist.
     * @remarks It must be `0 <= position <= N`, where N is the number of items in the playlist. Otherwise, the YouTube API will return an error.
     */
    position?: number;
}
