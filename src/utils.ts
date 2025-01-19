import type { GaxiosPromise } from "gaxios";
import { Err, Ok, type Result } from "result4js";

import { type YouTubesJsErrors, handleYouTubeApiError } from "./errors";

/**
 * Check if the data is null or undefined
 * @param data The data to check
 * @returns
 */
export function isNullish<T>(
    data: T | null | undefined,
): data is null | undefined {
    return data === null || data === undefined;
}

export async function wrapGaxios<T>(
    promise: GaxiosPromise<T>,
): Promise<Result<T, YouTubesJsErrors>> {
    try {
        const response = await promise;
        return Ok(response.data);
    } catch (error) {
        return Err(handleYouTubeApiError(error));
    }
}
