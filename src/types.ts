// Re-exports types from `googleapis`
// `googleapis` does not directly export some types that are needed
export type { OAuth2Client } from "google-auth-library";

import type { youtube_v3 } from "googleapis";

export type NativeClient = youtube_v3.Youtube;
