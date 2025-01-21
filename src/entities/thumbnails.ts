import type { youtube_v3 } from "googleapis";
import { Err, Ok, type Result } from "result4js";

import type { Logger } from "../Logger";
import { LikelyBugError } from "../errors";
import { isNullish } from "../utils";

/**
 * Presents the thumbnails of the video or the playlist.
 *
 * {@link https://developers.google.com/youtube/v3/docs/thumbnails | YouTube Data API Reference}
 */
export class Thumbnails {
    public default?: Thumbnail;
    public medium?: Thumbnail;
    public high?: Thumbnail;
    public standard?: Thumbnail;
    public maxres?: Thumbnail;

    constructor(data: ThumbnailsData) {
        this.default = data.default;
        this.medium = data.medium;
        this.high = data.high;
        this.standard = data.standard;
        this.maxres = data.maxres;
    }

    /**
     * Generates a `Thumbnails` instance from the YouTube API raw data.
     * @param data - The raw data from the YouTube API.
     */
    public static from(
        data: youtube_v3.Schema$ThumbnailDetails,
        logger: Logger,
    ): Result<Thumbnails, LikelyBugError> {
        const isInvalid = Object.values(data)
            .map((t) => {
                if (!t) return false;
                if (
                    isNullish(t.url) ||
                    isNullish(t.width) ||
                    isNullish(t.height)
                )
                    return true;
                return false;
            })
            .every((t) => !t);
        if (!isInvalid) {
            const currentLogger = logger.createChild("Thumbnails#from");
            currentLogger.debug(
                "Generating Thumbnails instance from raw data.",
            );
            currentLogger.debug("Raw data:");
            currentLogger.debug(JSON.stringify(data, null, "\t"));

            return Err(
                new LikelyBugError(
                    "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
                ),
            );
        }

        return Ok(new Thumbnails(data as ThumbnailsData));
    }

    /**
     * Returns the highest resolution thumbnail.
     * @returns The highest resolution thumbnail of the thumbnails.
     */
    getHighestResolution(): Thumbnail | null {
        return (
            this.maxres ??
            this.standard ??
            this.high ??
            this.medium ??
            this.default ??
            null
        );
    }

    /**
     * Returns the lowest resolution thumbnail.
     * @returns The lowest resolution thumbnail of the thumbnails.
     */
    getLowestResolution(): Thumbnail | null {
        return (
            this.default ??
            this.medium ??
            this.high ??
            this.standard ??
            this.maxres ??
            null
        );
    }
}

export interface Thumbnail {
    /**
     * The URL of the thumbnail image.
     */
    url: string;

    /**
     * The width of the thumbnail image.
     */
    width: number;

    /**
     * The height of the thumbnail image.
     */
    height: number;
}

export interface ThumbnailsData {
    default?: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
}
