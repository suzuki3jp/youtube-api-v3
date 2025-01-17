import type { youtube_v3 } from "googleapis";
import { Err, Ok, type Result } from "result4js";

import { mainLogger } from "../Logger";
import { isNullish } from "../utils";

/**
 * Presents the thumbnails of the video or the playlist.
 * [YouTube Data API Reference](https://developers.google.com/youtube/v3/docs/thumbnails)
 */
export class Thumbnails {
    public default: Thumbnail;
    public medium: Thumbnail;
    public high: Thumbnail;
    public standard: Thumbnail;
    public maxres: Thumbnail;

    constructor(data: ThumbnailsData) {
        this.default = data.default;
        this.medium = data.medium;
        this.high = data.high;
        this.standard = data.standard;
        this.maxres = data.maxres;
    }

    /**
     * Generates a `Thumbnails` instance from the YouTube API raw data.
     * @param data
     */
    public static from(
        data: youtube_v3.Schema$ThumbnailDetails,
    ): Result<Thumbnails, string> {
        const logger = mainLogger.createChild("Thumbnails#from");
        logger.debug("Generating Thumbnails instance from raw data.");
        logger.debug("Raw data:");
        logger.debug(JSON.stringify(data, null, "\t"));

        if (
            isNullish(data.default?.url) ||
            isNullish(data.default?.width) ||
            isNullish(data.default?.height) ||
            isNullish(data.medium?.url) ||
            isNullish(data.medium?.width) ||
            isNullish(data.medium?.height) ||
            isNullish(data.high?.url) ||
            isNullish(data.high?.width) ||
            isNullish(data.high?.height) ||
            isNullish(data.standard?.url) ||
            isNullish(data.standard?.width) ||
            isNullish(data.standard?.height) ||
            isNullish(data.maxres?.url) ||
            isNullish(data.maxres?.width) ||
            isNullish(data.maxres?.height)
        )
            return Err(
                "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
            );

        return Ok(new Thumbnails(data as ThumbnailsData));
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
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
}
