import httpProxy from 'http-proxy'
import http from 'node:http'
import { readFileSync } from 'fs'
import { BuildOptions, context } from 'esbuild'
import { DebugServerOpts } from './DebugServerOpts'
import { WatchPlugin } from './WatchPlugin'

export const startDebugServer = async (esbuildOpts: BuildOptions, debugOpts: DebugServerOpts) => {
  const { apiPathRewrite, debugPort, htmlPagePath, watchPluginOpts } = debugOpts

  // Get esbuild debug context.
  const ctx = await context({
    ...esbuildOpts,
    plugins: [...(esbuildOpts.plugins || []), WatchPlugin(watchPluginOpts)]
  })

  // Enable watch mode.
  await ctx.watch()

  // Run esbuild server.
  const { host, port } = await ctx.serve({
    servedir: esbuildOpts.outdir
  })

  // Prepare proxy server for redirecting cross-domain call,
  // if user provided necessarry config.
  const proxy = apiPathRewrite
    ? httpProxy.createProxyServer({
        ws: true,
        changeOrigin: true,
        target: apiPathRewrite.original
      })
    : undefined

  // Change origin header.
  if (proxy && apiPathRewrite) {
    proxy.on('proxyReq', function (proxyReq) {
      if (proxyReq.getHeader('origin')) {
        proxyReq.setHeader('origin', apiPathRewrite?.original)
      }
    })
  }

  // Create proxy debug server.
  http
    .createServer((rq, rs) => {
      const html = readFileSync(htmlPagePath)

      // Case when we should replace alias call to original path.
      if (proxy && apiPathRewrite && rq.url?.startsWith(apiPathRewrite.alias)) {
        proxy.web(rq, rs, {
          target: apiPathRewrite.original,
          cookieDomainRewrite: 'localhost',
          secure: false,
          changeOrigin: true
        })
      } else {
        const options = {
          hostname: host,
          port: port,
          path: rq.url,
          method: rq.method,
          headers: rq.headers
        }

        const proxyReq = http.request(options, (proxyRes) => {
          if (proxyRes.statusCode === 404) {
            rs.writeHead(200, {
              ...proxyRes.headers,
              'content-type': 'text/html',
              'content-length': html.length
            })
            rs.write(html)
          } else {
            rs.writeHead(proxyRes.statusCode || 200, proxyRes.headers)
          }
          proxyRes.pipe(rs, { end: true })
        })

        rq.pipe(proxyReq, { end: true })
      }
    })
    .listen(debugPort)

  console.log(`Debug server started on port ${debugPort}.`)
}
