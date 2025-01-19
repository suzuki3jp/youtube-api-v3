import { Err, Ok, type Result } from "result4js";

import type { Logger } from "./Logger";
import { LIKELY_BUG } from "./constants";
import type { YouTubesJsErrors } from "./errors";
import { isNullish } from "./utils";

/**
 * Provides utility methods for pagination.
 */
export class Pagination<T> {
    /**
     * The data of the current page.
     */
    public data: T;

    /**
     * The number of results included in the API response.
     */
    public resultsPerPage: number;

    /**
     * The total number of results in the result set.
     * **NOTE**: This number may be larger than the number of actual retrievable results. The YouTube Data API may not return some playlists (for example, the "Liked videos" playlist). However, the totalResults count may include them.
     */
    public totalResults: number;

    /**
     * The token for the previous page.
     * If `undefined`, there is no previous page.
     */
    private prevToken: string | null;

    /**
     * The token for the next page.
     * If `undefined`, there is no next page.
     */
    private nextToken: string | null;

    /**
     * Fetches the page with the given token.
     * @param token - The token of the page to fetch.
     */
    private getWithToken: (
        token: string,
    ) => Promise<Result<Pagination<T>, YouTubesJsErrors>>;

    private logger: Logger;

    constructor({
        data,
        logger,
        prevToken,
        nextToken,
        resultsPerPage,
        totalResults,
        getWithToken,
    }: PaginationOptions<T>) {
        this.data = data;
        this.logger = logger.createChild("Pagination#constructor");
        this.prevToken = prevToken ?? null;
        this.nextToken = nextToken ?? null;
        this.getWithToken = getWithToken;

        if (isNullish(resultsPerPage) || isNullish(totalResults)) {
            this.logger.debug("resultsPerPage or totalResults is not provided");
            this.logger.debug(
                "resultsPerPage and totalResults are expected to be included in the API response",
            );
            throw new Error(LIKELY_BUG);
        }
        this.resultsPerPage = resultsPerPage;
        this.totalResults = totalResults;
    }

    /**
     * Fetches the previous page.
     * - **NOTE**: This method will use the same quotas as the original request.
     * - Normally, GET requests use a quota of 1 unit, while other methods use 50 units.
     * - However, some heavy methods use more than 50 units.
     * - See more details on the [YouTube Data API reference](https://developers.google.com/youtube/v3/determine_quota_cost)
     * @returns The previous page. If there is no previous page, returns `null`.
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtubes.js";
     *
     * const oauth = new StaticOAuthProvider({
     *   accessToken: "ACCESS_TOKEN",
     * });
     * const client = new ApiClient({ oauth });
     *
     * const playlists = await client.playlists.getMine();
     * console.log(playlists.data); // The first page of playlists
     * const prevPage = await playlists.prev();
     * console.log(prevPage?.data); // The previous page of playlists or null if there is no previous page
     * ```
     */
    public async prev(): Promise<Result<
        Pagination<T>,
        YouTubesJsErrors
    > | null> {
        if (!this.prevToken) return null;
        const data = await this.getWithToken(this.prevToken);
        return data;
    }

    /**
     * Fetches the next page.
     * - **NOTE**: This method will use the same quotas as the original request.
     * - Normally, GET requests use a quota of 1 unit, while other methods use 50 units.
     * - However, some heavy methods use more than 50 units.
     * - See more details on the [YouTube Data API reference](https://developers.google.com/youtube/v3/determine_quota_cost)
     * @returns The next page. If there is no next page, returns `null`.
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtubes.js";
     *
     * const oauth = new StaticOAuthProvider({
     *    accessToken: "ACCESS_TOKEN",
     * });
     * const client = new ApiClient({ oauth });
     *
     * const playlists = await client.playlists.getMine();
     * console.log(playlists.data); // The first page of playlists
     * const nextPage = await playlists.next();
     * console.log(nextPage?.data); // The second page of playlists or null if there is no next page
     * ```
     */
    public async next(): Promise<Result<
        Pagination<T>,
        YouTubesJsErrors
    > | null> {
        if (!this.nextToken) return null;
        const data = await this.getWithToken(this.nextToken);
        return data;
    }

    /**
     * Fetches all pages data.
     * - **NOTE**: This method may consume unnecessary quotas, so be careful when using it in actual applications.
     * - We strongly recommend fetching the next page based on user actions (e.g., scrolling).
     * @returns All pages data in an array. If several items are in a page, this method will return a 2D array. Use `flat()` to convert it to a 1D array.
     * @example
     * ```ts
     * import { ApiClient, StaticOAuthProvider } from "youtubes.js";
     *
     * const oauth = new StaticOAuthProvider({
     *  accessToken: "ACCESS_TOKEN",
     * });
     * const client = new ApiClient({ oauth });
     *
     * const playlists = await client.playlists.getMine();
     * const allPlaylists = (await playlists.all()).flat();
     * ```
     */
    public async all(): Promise<Result<T[], YouTubesJsErrors>> {
        const result: T[] = [];
        result.push(this.data);

        let prev = await this.prev();
        while (prev) {
            if (prev.isErr()) return Err(prev.data);
            result.unshift(prev.data.data);
            prev = await prev.data.prev();
        }

        let next = await this.next();
        while (next) {
            if (next.isErr()) return Err(next.data);
            result.push(next.data.data);
            next = await next.data.next();
        }

        return Ok(result);
    }
}

export interface PaginationOptions<T> {
    data: T;
    logger: Logger;
    prevToken?: string | null;
    nextToken?: string | null;
    resultsPerPage?: number | null;
    totalResults?: number | null;
    getWithToken: (
        token: string,
    ) => Promise<Result<Pagination<T>, YouTubesJsErrors>>;
}
