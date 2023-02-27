import { build } from 'esbuild'
import { buildConfig } from './config'

const t1 = Date.now()

build(buildConfig())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    // eslint-disable-next-line
    console.log(`Build finished in ${(Date.now() - t1) / 1000}s`)
  })
