import { Err, Ok, type Result } from "result4js";

export type Privacy = "public" | "unlisted" | "private";

/**
 * Converts a YouTube API raw data to a `Privacy` type.
 * @param data
 */
export function convertToPrivacy(data?: string): Result<Privacy, string> {
    if (!data) return Err("The raw data is missing.");

    switch (data) {
        case "public":
            return Ok("public" as Privacy);
        case "unlisted":
            return Ok("unlisted" as Privacy);
        case "private":
            return Ok("private" as Privacy);
        default:
            return Err(
                `The raw data is unexpected format. Expected "public", "unlisted", or "private".`,
            );
    }
}
