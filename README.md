**esbuild-debug-tools** is a tiny helper which makes debbugging with esbuild i little bit easier.

There two exports in this library.

## WatchPlugin

Allows to listen for build start and build finish (and get build results). Accepts optional config:

```
export type WatchPluginOpts = {
  onStart?: () => void
  onEnd?: (result: BuildResult<BuildOptions>) => void
}
```

if no config is provided plugin will print results in standart console output.

## startDebugServer

Runs simple debug server. Method accepts options object:

```
export type DebugServerOpts = {
  apiPathRewrite?: {
    original: string
    alias: string
  }
  debugPort: number
  htmlPagePath: string
  watchPluginOpts?: WatchPluginOpts
}
```

`apiPathRewrite` - definition for rewriting cross-domain call to relative path. Can be useful to avoid problems with cross domain requests. For example, in debug mode we can use "/api/get-some-data", and this call will be redirected to original domain "https://api.somedomain.com".

`debugPort` - port to run application on.

`htmlPagePath` - path to output html file. We need it to read it and write to response when proxying the request.

`watchPluginOpts` - debug server uses WatchPlugin to detech code chaged, so it's a way to define its options.

## Good to know

1. Library requires `esbuild` of version `0.17.10` or later.
2. Currently esbuild-debug-tools doesn't have livereaload, so you have to provide own livereload plugin or reload page manually.
3. Path rewrite also supports web sockets.
