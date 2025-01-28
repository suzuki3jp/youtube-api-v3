import type { youtube_v3 } from "googleapis";
import { describe, expect, test } from "vitest";

import { Logger } from "../src/Logger";
import { Thumbnails } from "../src/entities/thumbnails";
import { LikelyBugError } from "../src/errors";

const logger = new Logger({ name: "ThumbnailsTest", level: "ERROR" });

describe("Thumbnails", () => {
    const dummy: [
        youtube_v3.Schema$ThumbnailDetails,
        Thumbnails | LikelyBugError,
    ][] = [
        // Valid data
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new Thumbnails({
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            }),
        ],

        // Missing some fields (default, medium, high, standard, maxres)
        [
            {
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new Thumbnails({
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            }),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new Thumbnails({
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            }),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new Thumbnails({
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            }),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new Thumbnails({
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            }),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
            },
            new Thumbnails({
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
            }),
        ],

        // Missing some fields (url, width, height)
        // TODO: Add more cases
        [
            {
                default: {
                    url: "default.jpg",
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                    height: 720,
                },
            },
            new LikelyBugError(
                "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
            ),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                },
                high: {
                    url: "hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    width: 1280,
                    height: 720,
                },
            },
            new LikelyBugError(
                "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
            ),
        ],
        [
            {
                default: {
                    url: "default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "hqdefault.jpg",
                    height: 360,
                },
                standard: {
                    url: "sddefault.jpg",
                    width: 640,
                    height: 480,
                },
                maxres: {
                    url: "maxresdefault.jpg",
                    width: 1280,
                },
            },
            new LikelyBugError(
                "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
            ),
        ],
    ];

    test(`Thumbnails#from for ${dummy.length} cases`, () => {
        for (const [data, expected] of dummy) {
            const actual = Thumbnails.from(data, logger);
            if (actual.isErr()) {
                expect(actual.error).toEqual(expected);
            } else {
                expect(actual.value).toEqual(expected);
            }
        }
    });
});
