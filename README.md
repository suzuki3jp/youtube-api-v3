<h1 align="center">
  youtubes.js
</h1>
<p align="center"> <em>A JavaScript client for YouTube Data API v3.</em>
</p>

> [!WARNING]
> _**WIP**_  
> This project is in the early stages of development.  
> There may be many bugs remaining.  
> _Despite being in the early stages of development, it is not marked as v0 due to the [limitations of semantic-release](https://github.com/semantic-release/semantic-release/issues/1507)._

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Install](#install)
  - [Quick Start](#quick-start)
- [Supported endpoints](#supported-endpoints)
- [License](#license)

## Getting Started
### Install
```sh
npm i youtubes.js
yarn add youtubes.js
pnpm add youtubes.js
```

### Quick Start
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
We are striving to support more endpoints, but currently, there are many unsupported endpoints. If the endpoint you want to use is not supported, please open an [issue](https://github.com/suzuki3jp/youtubes.js/issues) to request it. We plan to prioritize adding support for the most requested endpoints.

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
| [PlaylistItems](https://developers.google.com/youtube/v3/docs/playlistItems) | × | × | × | × |
| [Playlists](https://developers.google.com/youtube/v3/docs/playlists) | ✅ | ✅ | × | ✅ |
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