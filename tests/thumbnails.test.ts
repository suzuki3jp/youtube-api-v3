import type { youtube_v3 } from "googleapis";
import { describe, expect, test } from "vitest";

import { Thumbnails } from "../src/entities/thumbnails";

describe("Thumbnails", () => {
    const dummy: [youtube_v3.Schema$ThumbnailDetails, Thumbnails | string][] = [
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
            "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
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
            "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
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
            "The raw data is missing required fields. Each thumbnail (default, medium, high, standard, maxres) must include url, width, and height.",
        ],
    ];

    test(`Thumbnails#from for ${dummy.length} cases`, () => {
        for (const [data, expected] of dummy) {
            expect(Thumbnails.from(data).data).toEqual(expected);
        }
    });
});
