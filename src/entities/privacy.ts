import { Err, Ok, type Result } from "result4js";

import { LikelyBugError } from "../errors";

export type Privacy = "public" | "unlisted" | "private";

/**
 * Converts a YouTube API raw data to a `Privacy` type.
 * @param data
 */
export function convertToPrivacy(
    data?: string,
): Result<Privacy, LikelyBugError> {
    if (!data) return Err(new LikelyBugError("The raw data is undefined."));

    switch (data) {
        case "public":
            return Ok("public" as Privacy);
        case "unlisted":
            return Ok("unlisted" as Privacy);
        case "private":
            return Ok("private" as Privacy);
        default:
            return Err(
                new LikelyBugError(
                    `The raw data is unexpected format. Expected "public", "unlisted", or "private". Received: ${data}`,
                ),
            );
    }
}
