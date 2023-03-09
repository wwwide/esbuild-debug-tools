import { WatchPluginOpts } from './WatchPlugin'

export type DebugServerOpts = {
  /**
   * Definition for rewriting cross-domain call to relative path.
   * For example, in debug mode we can use "/api/get-some-data",
   * and this call will be redirected to original domain
   * "https://api.somedomain.com".
   */
  apiPathRewrite?: {
    original: string
    alias: string
  }

  /**
   * Port to run application on.
   */
  debugPort: number

  /**
   * Path to output html file. We need it to read it and write to
   * response when proxying the request.
   */
  htmlPagePath: string

  /**
   * Debug server uses WatchPlugin to detech code chaged, so
   * it's a way to define its options.
   */
  watchPluginOpts?: WatchPluginOpts
}
