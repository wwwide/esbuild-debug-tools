import { readFileSync } from 'fs'
import { BuildOptions } from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'

export const buildConfig: BuildOptions = {
  plugins: [
    htmlPlugin({
      files: [
        {
          entryPoints: ['test/index.ts'],
          filename: 'index.html',
          htmlTemplate: readFileSync('./test/index.html').toString(),
          scriptLoading: 'module',
          title: 'Test'
        }
      ]
    })
  ],
  entryPoints: ['./test/index.ts'],
  outdir: 'test/dist',
  bundle: true,
  metafile: true,
  sourcemap: false,
  minify: false,
  splitting: true,
  format: 'esm',
  color: true,
  publicPath: '/',
  loader: {
    '.js': 'jsx'
  }
}
