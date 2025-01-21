import type { youtube_v3 } from "googleapis";
import { Err, Ok, type Result } from "result4js";

import type { Logger } from "../Logger";
import { LikelyBugError } from "../errors";
import { isNullish } from "../utils";
import { convertToPrivacy } from "./privacy";
import { Thumbnails } from "./thumbnails";

export type PlaylistItem = AvailablePlaylistItem | UnavailablePlaylistItem;

export function playlistItemFrom(
    data: youtube_v3.Schema$PlaylistItem,
    logger: Logger,
): Result<PlaylistItem, LikelyBugError> {
    const currentLogger = logger.createChild("playlistItemFromMany");
    // Handle private videos that is not owned by the user
    // YouTube API returns the following data:
    //  {
    //      "kind": "youtube#playlistItem",
    //      "etag": "ylzee7oXd2oBrFvIgtU1NxswXHg",
    //      "id": "UExMdC1zVVB4NmphTjhXbVhXT1JLemFULVZKbnp3NnpnRi41MjE1MkI0OTQ2QzJGNzNG",
    //      "snippet": {
    //          "publishedAt": "2025-01-20T07:17:50Z",
    //          "channelId": "UCBZaV3lYDMKM7Y0PF46ON0Q",
    //          "title": "Private video",
    //          "description": "This video is private.",
    //          "thumbnails": {},
    //          "channelTitle": "鈴木",
    //          "playlistId": "PLLt-sUPx6jaN8WmXWORKzaT-VJnzw6zgF",
    //          "position": 3,
    //          "resourceId": {
    //              "kind": "youtube#video",
    //              "videoId": "GKkd7IDPwfE"
    //          }
    //      },
    //      "contentDetails": {
    //          "videoId": "GKkd7IDPwfE"
    //      },
    //      "status": {
    //          "privacyStatus": "private"
    //      }
    // }
    if (
        data.status?.privacyStatus === "private" &&
        Object.keys(data.snippet?.thumbnails ?? {}).length === 0
    )
        return Ok(new UnavailablePlaylistItem());

    if (
        isNullish(data.id) ||
        isNullish(data.snippet?.playlistId) ||
        isNullish(data.snippet?.title) ||
        isNullish(data.snippet?.description) ||
        isNullish(data.snippet?.thumbnails) ||
        isNullish(data.snippet?.channelId) ||
        isNullish(data.snippet?.channelTitle) ||
        isNullish(data.snippet?.resourceId?.videoId) ||
        isNullish(data.snippet?.position) ||
        isNullish(data.status?.privacyStatus) ||
        isNullish(data.snippet?.videoOwnerChannelId) ||
        isNullish(data.snippet?.videoOwnerChannelTitle)
    ) {
        currentLogger.debug("Generating PlaylistItem instance from raw data.");
        currentLogger.debug("Raw data:");
        currentLogger.debug(JSON.stringify(data, null, "\t"));

        return Err(
            new LikelyBugError(
                "The raw data is missing required fields of a playlist data.",
            ),
        );
    }

    const thumbnails = Thumbnails.from(data.snippet.thumbnails, currentLogger);
    const privacy = convertToPrivacy(data.status.privacyStatus);
    if (thumbnails.isErr()) return Err(thumbnails.data);
    if (privacy.isErr()) return Err(privacy.data);

    return Ok(
        new AvailablePlaylistItem({
            id: data.id,
            playlistId: data.snippet.playlistId,
            title: data.snippet.title,
            description: data.snippet.description,
            thumbnails: thumbnails.data,
            channelId: data.snippet.channelId,
            channelName: data.snippet.channelTitle,
            videoId: data.snippet.resourceId.videoId,
            videoOwnerChannelId: data.snippet.videoOwnerChannelId,
            videoOwnerChannelName: data.snippet.videoOwnerChannelTitle,
            position: data.snippet.position,
        }),
    );
}

export function playlistItemFromMany(
    data: youtube_v3.Schema$PlaylistItem[],
    logger: Logger,
): Result<PlaylistItem[], LikelyBugError> {
    const playlistItems: PlaylistItem[] = [];
    for (const item of data) {
        const playlistItem = playlistItemFrom(item, logger);
        if (playlistItem.isErr()) return Err(playlistItem.data);

        playlistItems.push(playlistItem.data);
    }

    return Ok(playlistItems);
}

/**
 * A playlist item that is available.
 */
export class AvailablePlaylistItem implements BasePlaylistItem {
    /**
     * The ID that YouTube uses to uniquely identify the playlist item.
     */
    public id: string;

    /**
     * The ID that YouTube uses to uniquely identify the playlist that the playlist item is in.
     */
    public playlistId: string;

    /**
     * The item's title.
     */
    public title: string;

    /**
     * The item's description.
     */
    public description: string;

    /**
     * The item's thumbnails.
     */
    public thumbnails: Thumbnails;

    /**
     * The ID that YouTube uses to uniquely identify the user that added the item to the playlist.
     */
    public channelId: string;

    /**
     * The channel name of the channel that the playlist item belongs to.
     */
    public channelName: string;

    /**
     * The ID that YouTube uses to uniquely identify a video.
     */
    public videoId: string;

    /**
     * The channel ID of the channel that uploaded this video.
     */
    public videoOwnerChannelId: string;

    /**
     * The channel name of the channel that uploaded this video.
     */
    public videoOwnerChannelName: string;

    /**
     * The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.
     */
    public position: number;

    constructor(data: PlaylistItemData) {
        this.id = data.id;
        this.playlistId = data.playlistId;
        this.title = data.title;
        this.description = data.description;
        this.thumbnails = data.thumbnails;
        this.channelId = data.channelId;
        this.channelName = data.channelName;
        this.videoId = data.videoId;
        this.videoOwnerChannelId = data.videoOwnerChannelId;
        this.videoOwnerChannelName = data.videoOwnerChannelName;
        this.position = data.position;
    }

    isAvailable() {
        return true;
    }
}

/**
 * A playlist item that is not available.
 * e.g A video that is private.
 */
export class UnavailablePlaylistItem implements BasePlaylistItem {
    isAvailable() {
        return true;
    }
}

interface BasePlaylistItem {
    /**
     * Whether the playlist item is available
     * @returns `true` if the playlist item is available, `false` otherwise.
     */
    isAvailable: () => boolean;
}

export interface PlaylistItemData {
    id: string;
    playlistId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelId: string;
    channelName: string;
    videoId: string;
    videoOwnerChannelId: string;
    videoOwnerChannelName: string;
    position: number;

    // `contentDetails.note` is never included. idk why
}
