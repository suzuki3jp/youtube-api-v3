import { GaxiosError } from "gaxios";

export type YouTubesJsErrors = LikelyBugError | YouTubeApiError;

/**
 * Represents an error that is likely a bug in the library.
 *
 * If you encounter this error, please report the issue on [GitHub Issue](https://github.com/suzuki3jp/youtubes.js/issues/new).
 */
export class LikelyBugError implements BaseError {
    public type = "LIKELY_BUG";
    public message: string;

    constructor(message: string) {
        this.message = message;
    }

    /**
     * Converts the error to an `Error` object.
     * @returns
     */
    public toError(): Error {
        const error = new Error(this.message);
        error.name = "LikelyBugError";
        return error;
    }

    /**
     * Throws the error.
     */
    public throw(): never {
        throw this.toError();
    }
}

/**
 * Represents an error from the YouTube API.
 *
 * This error is thrown when the YouTube API returns an error response.
 */
export class YouTubeApiError implements BaseError {
    public type = "YOUTUBE_API_ERROR";
    public code: number;
    public message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    /**
     * Converts the error to an `Error` object.
     * @returns
     */
    public toError(): Error {
        const error = new Error(`[${this.code}] ${this.message}`);
        error.name = "YouTubeApiError";
        return error;
    }

    /**
     * Throws the error.
     */
    public throw(): never {
        throw this.toError();
    }
}

interface BaseError {
    type: string;
    toError(): Error;
}

/**
 * Handles an error from the YouTube API cathing in the try-catch block.
 * @param error
 */
export function handleYouTubeApiError(error: unknown): YouTubesJsErrors {
    if (error instanceof GaxiosError) {
        const code = Number.parseInt(error.code || "500");
        return new YouTubeApiError(code, error.message);
    }

    return new LikelyBugError(
        "An unexpected error occurred in the call to the YouTube API.",
    );
}
