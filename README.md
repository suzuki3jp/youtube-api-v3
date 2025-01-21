<h1 align="center">
  youtubes.js
</h1>
<p align="center"> <em>A JavaScript client for YouTube Data API v3.</em>
</p>

> [!WARNING]
> _**WIP**_  
> This project is in the early stages of development.  
> There may be many bugs remaining.
>
> Note: `youtubes.js` follows [semantic versioning](https://semver.org) (MAJOR.MINOR.PATCH). Between versions `0.4.0` and `1.0.0`, `MINOR` version updates may include breaking changes and non-backwards compatible features, while `PATCH` updates will only include backwards compatible changes and fixes.

![NPM Version](https://img.shields.io/npm/v/youtubes.js)
![NPM Downloads](https://img.shields.io/npm/dm/youtubes.js)

## Table of Contents
<!-- no toc -->
- [Highlights](#highlights)
- [Quick Start](#quick-start)
- [Introduction](/docs/01-introduction.md)
- [Use Cases](/docs/02-usecases.md)
- [Reference](/docs/api/youtubes.js.md)
- [Supported endpoints](#supported-endpoints)
- [License](#license)

## Highlights
- Full object-oriented architecture
- Complete TypeScript type definitions
- Robust error handling with `Result` type
- Built-in request pagination

## Quick Start
```sh
npm i youtubes.js
yarn add youtubes.js
pnpm add youtubes.js
```

```ts
import { ApiClient, StaticOAuthProvider } from "youtubes.js";

async function main() {
    const oauth = new StaticOAuthProvider({
        accessToken: "YOUR_ACCESS_TOKEN",
    });
    const client = new ApiClient({ oauth });

    const playlistsPage = await client.playlists.getMine(); // Fetches the first page of playlists
    const playlists = (await playlistsPage.all()).flat(); // Fetches all pages of playlists
}

main();
```

## Supported endpoints
We are striving to support more endpoints, but currently, there are many unsupported endpoints. If the endpoint you want to use is not supported, please open an [issue](https://github.com/suzuki3jp/youtubes.js/issues/new) to request it. We plan to prioritize adding support for the most requested endpoints.

×: Not supported  
⚠️: Partially supported  
✅: Fully supported

| Endpoint | list (GET) | insert (POST) | update (PUT) | delete (DELETE) |
|----------|------|--------|--------|--------|
| [Captions](https://developers.google.com/youtube/v3/docs/captions) | × | × | × | × |
| [ChannelBanners](https://developers.google.com/youtube/v3/docs/channelBanners) | - | × | - | - |
| [Channels](https://developers.google.com/youtube/v3/docs/channels) | × | - | × | - |
| [ChannelSections](https://developers.google.com/youtube/v3/docs/channelSections) | × | × | × | × |
| [Comments](https://developers.google.com/youtube/v3/docs/comments) | × | × | × | × |
| [CommentThreads](https://developers.google.com/youtube/v3/docs/commentThreads) | × | × | - | - |
| [I18nLanguages](https://developers.google.com/youtube/v3/docs/i18nLanguages) | × | - | - | - |
| [I18nRegions](https://developers.google.com/youtube/v3/docs/i18nRegions) | × | - | - | - |
| [Members](https://developers.google.com/youtube/v3/docs/members) | × | - | - | - |
| [MembershipsLevels](https://developers.google.com/youtube/v3/docs/membershipsLevels) | × | - | - | - |
| [PlaylistImages](https://developers.google.com/youtube/v3/docs/playlistImages) | × | × | × | × |
| [PlaylistItems](https://developers.google.com/youtube/v3/docs/playlistItems) | ⚠️ | ✅ | × | × |
| [Playlists](https://developers.google.com/youtube/v3/docs/playlists) | ✅ | ✅ | ✅ | ✅ |
| [Search](https://developers.google.com/youtube/v3/docs/search) | × | - | - | - |
| [Subscriptions](https://developers.google.com/youtube/v3/docs/subscriptions) | × | × | - | × |
| [Thumbnails](https://developers.google.com/youtube/v3/docs/thumbnails) | - | × | - | - |
| [VideoAbuseReportReasons](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons) | × | - | - | - |
| [VideoCategories](https://developers.google.com/youtube/v3/docs/videoCategories) | × | - | - | - |
| [Videos](https://developers.google.com/youtube/v3/docs/videos) | × | × | × | × |
| [Watermarks](https://developers.google.com/youtube/v3/docs/watermarks) | - | × | - | - |

> We currently do not plan to support the [YouTube Live Streaming API](https://developers.google.com/youtube/v3/live).

## License
[MIT](./LICENSE)