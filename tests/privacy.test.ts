import { expect, test } from "vitest";

import { convertToPrivacy } from "../src/entities/privacy";
import { LikelyBugError } from "../src/errors";

test("convertToPrivacy", () => {
    const dummy: [string | undefined, string | LikelyBugError][] = [
        // Valid data
        ["public", "public"],
        ["unlisted", "unlisted"],
        ["private", "private"],

        // Invalid data
        [undefined, new LikelyBugError("The raw data is undefined.")],
        [
            "invalid",
            new LikelyBugError(
                `The raw data is unexpected format. Expected "public", "unlisted", or "private". Received: invalid`,
            ),
        ],
    ];

    for (const [data, expected] of dummy) {
        expect(convertToPrivacy(data).data).toEqual(expected);
    }
});
