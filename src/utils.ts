import type { GaxiosPromise } from "gaxios";
import { type Result, err, ok } from "neverthrow";

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
        return ok(response.data);
    } catch (error) {
        return err(handleYouTubeApiError(error));
    }
}
