import { build } from 'esbuild'
import { buildConfig } from './buildConfig'
import { hashifyScriptPath } from '../../src'

const t1 = Date.now()

console.log(__dirname)

build(buildConfig)
  .then(() => {
    hashifyScriptPath('./test/dist/index.html', '/index.js', './test/dist/index.js')
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    // eslint-disable-next-line
    console.log(`Finished in ${(Date.now() - t1) / 1000}s`)
  })
