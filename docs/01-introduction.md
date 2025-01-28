# Introduction
## What's `youtubes.js`?
`youtubes.js` is a JavaScript library for interacting YouTube Data API v3.
Type-safe, Object-oriented, handling errors with `Result`

## Installation
`youtubes.js` supports LTS nodejs version.
```sh
npm i youtubes.js
yarn add youtubes.js
pnpm add youtuebs.js
```

## Authentication
You'll need to obtain authentication credentials from the [Google API Console](https://developers.google.com/youtube/registering_an_application).

Currently, `youtubes.js` requires an `access_token` for all operations. For web applications, we recommend using authentication libraries like [next-auth](https://next-auth.js.org/). You can find a working example of token acquisition using next-auth [here](https://github.com/suzuki3jp/PlaylistWizard/blob/7312022fd7840d20085ea7598875b1f128c37d85/src/app/api/auth/%5B...nextauth%5D/nextAuthOptions.ts#L14-L39).  

Note: API key support is planned. Please submit an [Issue](https://github.com/suzuki3jp/youtubes.js/issues/new) if you need this feature.

## Basic Usage
Here's an example that retrieves all your playlists. For more examples, see [Use Cases](./02-usecases.md).

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

## Handling errors
All public methods of `youtubes.js` return `Result` of [`neverthrow`](https://github.com/supermacro/neverthrow).  
Using `Result` enables type-safe error handling.  
While developers familiar with JavaScript might find `Result`-based error handling cumbersome at first, it will dramatically improve application reliability and substantially enhance the development experience through type safety.

```ts
import { ApiClient, StaticOAuthProvider } from "youtubes.js";

async function main() {
    const oauth = new StaticOAuthProvider({
        accessToken: "YOUR_ACCESS_TOKEN",
    });
    const client = new ApiClient({ oauth });

    const playlistsResult = await client.playlists.getMine();
    
    if (playlists.isErr()) {
        // Handle error case
        return;
    }

    const playlists = playlistsResult.value;
}

main();
```

## Logging
Configure logging level in the `ApiClient` constructor:
```ts
// Logs DEBUG level and above. Available: ERROR (default), INFO, DEBUG
const client = new ApiClient({ oauth, logLevel: "DEBUG" });
```

## If you find bugs
If you encounter an error message like: `"This is likely a bug. Please report the issue at https://github.com/suzuki3jp/youtubes.js/issues with debug logs."`

Please follow these steps:

1. Enable DEBUG level logging
2. Capture the debug output
3. [Submit an issue](https://github.com/suzuki3jp/youtubes.js/issues/new) with the logs