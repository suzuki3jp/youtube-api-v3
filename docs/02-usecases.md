# Use Cases

## Note
All methods in `youtubes.js` return [`Result`](https://github.com/suzuki3jp/result4js) for safe error handling.  
Learn more about error handling with `Result` [here](./01-introduction.md#handling-errors).

## Pagination
The YouTube Data API v3 sometimes returns paginated responses.
For such endpoints, `youtubes.js` returns data wrapped in [`Pagination`](../src/Pagination.ts) to simplify requesting additional pages.

```ts
import { ApiClient, StaticOAuthProvider } from "youtubes.js";

const oauth = new StaticOAuthProvider({
    accessToken: "ACCESS_TOKEN",
});
const client = new ApiClient({ oauth });

const playlists = await client.playlists.getMine(); // Result<Pagination<Playlist[]>, YouTubesJsErrors>
console.log(playlists.data); // The first page of playlists

// Get the previous page
// Returns null if no previous page exists
const prevPage = await playlists.prev(); // Result<Pagination<Playlist>, YouTubesJsErrors> | null

// Get the next page
// Returns null if no next page exists
const nextPage = await playlists.next(); // Result<Pagination<Playlist>, YouTubesJsErrors> | null

// Get all pages
// **NOTE**: This method may consume unnecessary quotas, so be careful when using it in actual applications.
// We strongly recommend fetching the next page based on user actions (e.g., scrolling).
const allPages = await playlists.all() // Result<Playlist[], YouTubesJsErrors
if (allPages.isErr()) return; // Handling errors
// Returns all pages in an array. For multiple items per page, returns a 2D array.
// Use flat() to convert to a 1D array.
const data = allPages.data.flat();
```

## `Playlists`
To interact with the [`playlists`](https://developers.google.com/youtube/v3/docs/playlists) endpoint, use [`PlaylistManager`](../src/managers/PlaylistManager.ts).

```ts
import { ApiClient, StaticOAuthProvider } from "youtubes.js";

const oauth = new StaticOAuthProvider({
 accessToken: "ACCESS_TOKEN",
});
const client = new ApiClient({ oauth });

// You can access to the `PlaylistManager` here.
client.playlists
```

### Retrieving Playlists
You can retrieve playlists using:

- [`PlaylistManager#getMine`](../src/managers/PlaylistManager.ts#L57)
- [`PlaylistManager#getByIds`](../src/managers/PlaylistManager.ts#L109)
- [`PlaylistManager#getByChannelId`](../src/managers/PlaylistManager.ts#L162)

```ts
import { ApiClient, StaticOAuthProvider } from "youtubes.js";

const oauth = new StaticOAuthProvider({
 accessToken: "ACCESS_TOKEN",
});
const client = new ApiClient({ oauth });

const myPlaylists = await client.playlists.getMine(); // Result<Pagination<Playlist[]>, YouTubesJsErrors>
const playlists = await client.playlists.getByIds(["ID1", "ID2"]); // Result<Pagination<Playlist[]>, YouTubesJsErrors>
const channelPlaylists = await client.playlists.getByChannelId("CHANNEL_ID"); // Result<Pagination<Playlist[]>, YouTubesJsErrors>
```