import { BuildOptions, BuildResult, Plugin } from 'esbuild'

export type WatchPluginOpts = {
  onStart?: () => void
  onEnd?: (result: BuildResult<BuildOptions>) => void
}

export const WatchPlugin = (opts?: WatchPluginOpts): Plugin => ({
  name: 'watch-plugin',
  setup(build) {
    let t1 = Date.now()
    build.onStart(opts?.onStart || (() => {
      t1 = Date.now()
      console.log('Starting partial build...')
    }))
    build.onEnd(opts?.onEnd || ((result) => {
      const ms = Date.now() - t1
      if (result.errors.length) {
        console.error(`Failed in ${ms} ms. Errors: `)
        console.log(result.errors)
      } else {
        console.log(`Done in ${ms} ms.`)
      }
    }))
  }
})