import { expect, test } from "vitest";

import { convertToPrivacy } from "../src/entities/privacy";

test("convertToPrivacy", () => {
    const dummy: [string | undefined, string][] = [
        // Valid data
        ["public", "public"],
        ["unlisted", "unlisted"],
        ["private", "private"],

        // Invalid data
        [undefined, "The raw data is missing."],
        [
            "invalid",
            `The raw data is unexpected format. Expected "public", "unlisted", or "private".`,
        ],
    ];

    for (const [data, expected] of dummy) {
        expect(convertToPrivacy(data).data).toEqual(expected);
    }
});
