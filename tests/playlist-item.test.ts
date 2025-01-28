import type { youtube_v3 } from "googleapis";
import { expect, test } from "vitest";

import { Logger } from "../src/Logger";
import {
    AvailablePlaylistItem,
    type PlaylistItem,
    playlistItemFrom,
} from "../src/entities/playlist-item";
import { Thumbnails } from "../src/entities/thumbnails";

const logger = new Logger({ name: "playlistItemFrom", level: "ERROR" });

test("playlistItemFrom", () => {
    const dummy: [youtube_v3.Schema$PlaylistItem, PlaylistItem][] = [
        [
            {
                kind: "youtube#playlistItem",
                etag: "sample-etag",
                id: "sample-id",
                snippet: {
                    publishedAt: "2024-10-29T18:48:11Z",
                    channelId: "sample-channel-id",
                    title: "sample-title",
                    description: "sample-description",
                    thumbnails: {
                        default: {
                            url: "https://i.ytimg.com/vi/sample/default.jpg",
                            width: 120,
                            height: 90,
                        },
                        medium: {
                            url: "https://i.ytimg.com/vi/sample/mqdefault.jpg",
                            width: 320,
                            height: 180,
                        },
                        high: {
                            url: "https://i.ytimg.com/vi/sample/hqdefault.jpg",
                            width: 480,
                            height: 360,
                        },
                        standard: {
                            url: "https://i.ytimg.com/vi/sample/sddefault.jpg",
                            width: 640,
                            height: 480,
                        },
                        maxres: {
                            url: "https://i.ytimg.com/vi/sample/maxresdefault.jpg",
                            width: 1280,
                            height: 720,
                        },
                    },
                    channelTitle: "sample-channel-title",
                    playlistId: "sample-playlist-id",
                    position: 0,
                    resourceId: {
                        kind: "youtube#video",
                        videoId: "sample-video-id",
                    },
                    videoOwnerChannelTitle: "sample-video-owner-channel-title",
                    videoOwnerChannelId: "sample-video-owner-channel-id",
                },
                contentDetails: {
                    videoId: "sample-video-id",
                    videoPublishedAt: "2021-06-11T04:05:37Z",
                },
                status: {
                    privacyStatus: "public",
                },
            },
            new AvailablePlaylistItem({
                id: "sample-id",
                playlistId: "sample-playlist-id",
                title: "sample-title",
                description: "sample-description",
                thumbnails: new Thumbnails({
                    default: {
                        url: "https://i.ytimg.com/vi/sample/default.jpg",
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/sample/mqdefault.jpg",
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/sample/hqdefault.jpg",
                        width: 480,
                        height: 360,
                    },
                    standard: {
                        url: "https://i.ytimg.com/vi/sample/sddefault.jpg",
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: "https://i.ytimg.com/vi/sample/maxresdefault.jpg",
                        width: 1280,
                        height: 720,
                    },
                }),
                channelId: "sample-channel-id",
                channelName: "sample-channel-title",
                videoId: "sample-video-id",
                videoOwnerChannelId: "sample-video-owner-channel-id",
                videoOwnerChannelName: "sample-video-owner-channel-title",
                position: 0,
            }),
        ],
        [
            {
                kind: "youtube#playlistItem",
                etag: "sample-etag-2",
                id: "sample-id-2",
                snippet: {
                    publishedAt: "2025-01-20T07:17:50Z",
                    channelId: "sample-channel-id-2",
                    title: "sample-title-2",
                    description: "",
                    thumbnails: {
                        default: {
                            url: "https://i.ytimg.com/vi/sample2/default.jpg",
                            width: 120,
                            height: 90,
                        },
                        medium: {
                            url: "https://i.ytimg.com/vi/sample2/mqdefault.jpg",
                            width: 320,
                            height: 180,
                        },
                        high: {
                            url: "https://i.ytimg.com/vi/sample2/hqdefault.jpg",
                            width: 480,
                            height: 360,
                        },
                        standard: {
                            url: "https://i.ytimg.com/vi/sample2/sddefault.jpg",
                            width: 640,
                            height: 480,
                        },
                        maxres: {
                            url: "https://i.ytimg.com/vi/sample2/maxresdefault.jpg",
                            width: 1280,
                            height: 720,
                        },
                    },
                    channelTitle: "sample-channel-title-2",
                    playlistId: "sample-playlist-id-2",
                    position: 3,
                    resourceId: {
                        kind: "youtube#video",
                        videoId: "sample-video-id-2",
                    },
                    videoOwnerChannelTitle:
                        "sample-video-owner-channel-title-2",
                    videoOwnerChannelId: "sample-video-owner-channel-id-2",
                },
                contentDetails: {
                    videoId: "sample-video-id-2",
                    videoPublishedAt: "2024-12-07T06:42:10Z",
                },
                status: {
                    privacyStatus: "private",
                },
            },
            new AvailablePlaylistItem({
                id: "sample-id-2",
                playlistId: "sample-playlist-id-2",
                title: "sample-title-2",
                description: "",
                thumbnails: new Thumbnails({
                    default: {
                        url: "https://i.ytimg.com/vi/sample2/default.jpg",
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/sample2/mqdefault.jpg",
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/sample2/hqdefault.jpg",
                        width: 480,
                        height: 360,
                    },
                    standard: {
                        url: "https://i.ytimg.com/vi/sample2/sddefault.jpg",
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: "https://i.ytimg.com/vi/sample2/maxresdefault.jpg",
                        width: 1280,
                        height: 720,
                    },
                }),
                channelId: "sample-channel-id-2",
                channelName: "sample-channel-title-2",
                videoId: "sample-video-id-2",
                videoOwnerChannelId: "sample-video-owner-channel-id-2",
                videoOwnerChannelName: "sample-video-owner-channel-title-2",
                position: 3,
            }),
        ],
    ];

    for (const [input, expected] of dummy) {
        const actual = playlistItemFrom(input, logger);
        if (actual.isErr()) {
            expect(actual.error).toEqual(expected);
        } else {
            expect(actual.value).toEqual(expected);
        }
    }
});
