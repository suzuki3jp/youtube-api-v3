import { type Result, err, ok } from "neverthrow";

import { LikelyBugError } from "../errors";

export type Privacy = "public" | "unlisted" | "private";

/**
 * Converts a YouTube API raw data to a `Privacy` type.
 * @param data
 */
export function convertToPrivacy(
    data?: string,
): Result<Privacy, LikelyBugError> {
    if (!data) return err(new LikelyBugError("The raw data is undefined."));

    switch (data) {
        case "public":
            return ok("public");
        case "unlisted":
            return ok("unlisted");
        case "private":
            return ok("private");
        default:
            return err(
                new LikelyBugError(
                    `The raw data is unexpected format. Expected "public", "unlisted", or "private". Received: ${data}`,
                ),
            );
    }
}
