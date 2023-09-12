import { WatchPluginOpts } from './WatchPlugin'

export type DebugServerOpts = {
  /**
   * Definition for rewriting cross-domain call to relative path.
   * For example, in debug mode we can use "/api/get-some-data",
   * and this call will be redirected to original domain
   * "https://api.somedomain.com".
   */
  apiPathRewrite?: {
    // Target URL to be redirected to.
    original: string
    // Pattern to detect which requests we should proxy to "original"
    prefix: string
    // If set to true path redirected to original URL will not contain "prefix" part.
    removePrefix?: boolean
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
