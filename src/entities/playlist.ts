import type { youtube_v3 } from "googleapis";
import { type Result, err, ok } from "neverthrow";

import type { Logger } from "../Logger";
import { LikelyBugError } from "../errors";
import { isNullish } from "../utils";
import { type Privacy, convertToPrivacy } from "./privacy";
import { Thumbnails } from "./thumbnails";

/**
 * Represents a YouTube playlist resource.
 *
 * {@link https://developers.google.com/youtube/v3/docs/playlists#resource | YouTube Data API Reference}
 */
export class Playlist {
    /**
     * The ID that YouTube uses to uniquely identify the playlist.
     */
    public id: string;

    /**
     * The title of the playlist.
     */
    public title: string;

    /**
     * The description of the playlist.
     */
    public description: string;

    /**
     * The thumbnails of the playlist.
     */
    public thumbnails: Thumbnails;

    /**
     * The privacy status of the playlist.
     */
    public privacy: Privacy;

    /**
     * The number of videos in the playlist.
     */
    public count: number;

    /**
     * The date and time that the playlist was created.
     */
    public publishedAt: Date;

    /**
     * The channel id that the playlist belongs to.
     */
    public channelId: string;

    /**
     * The channel name that the playlist belongs to.
     */
    public channelName: string;

    constructor({
        id,
        title,
        description,
        thumbnails,
        privacy,
        count,
        publishedAt,
        channelId,
        channelName,
    }: PlaylistData) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnails = thumbnails;
        this.privacy = privacy;
        this.count = count;
        this.publishedAt = publishedAt;
        this.channelId = channelId;
        this.channelName = channelName;
    }

    public static from(
        data: youtube_v3.Schema$Playlist,
        logger: Logger,
    ): Result<Playlist, LikelyBugError> {
        const currentLogger = logger.createChild("Playlist#from");

        if (
            isNullish(data.id) ||
            isNullish(data.snippet?.title) ||
            isNullish(data.snippet?.description) ||
            isNullish(data.snippet?.thumbnails) ||
            isNullish(data.status?.privacyStatus) ||
            isNullish(data.contentDetails?.itemCount) ||
            isNullish(data.snippet?.publishedAt) ||
            isNullish(data.snippet?.channelId) ||
            isNullish(data.snippet?.channelTitle)
        ) {
            const message =
                "The raw data is missing required fields. playlist raw data must include id, snippet.title, snippet.description, snippet.thumbnails, status.privacyStatus, contentDetails.itemCount, snippet.publishedAt, snippet.channelId, and snippet.channelTitle.";
            currentLogger.debug("Generating Playlist instance from raw data.");
            currentLogger.debug("Raw data:");
            currentLogger.debug(JSON.stringify(data, null, "\t"));
            return err(new LikelyBugError(message));
        }

        const thumbnails = Thumbnails.from(
            data.snippet.thumbnails,
            currentLogger,
        );
        const privacy = convertToPrivacy(data.status.privacyStatus);
        if (privacy.isErr()) return err(privacy.error);
        if (thumbnails.isErr()) return err(thumbnails.error);

        return ok(
            new Playlist({
                id: data.id,
                title: data.snippet.title,
                description: data.snippet.description,
                thumbnails: thumbnails.value,
                privacy: privacy.value,
                count: data.contentDetails.itemCount,
                publishedAt: new Date(data.snippet.publishedAt),
                channelId: data.snippet.channelId,
                channelName: data.snippet.channelTitle,
            }),
        );
    }

    public static fromMany(
        data: youtube_v3.Schema$Playlist[],
        logger: Logger,
    ): Result<Playlist[], LikelyBugError> {
        const currentLogger = logger.createChild("Playlist#fromMany");

        const playlists: Playlist[] = [];
        for (const playlist of data) {
            const result = Playlist.from(playlist, currentLogger);
            if (result.isErr()) {
                return err(result.error);
            }
            playlists.push(result.value);
        }

        return ok(playlists);
    }
}

interface PlaylistData {
    id: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    privacy: Privacy;
    count: number;
    publishedAt: Date;
    channelId: string;
    channelName: string;
}
