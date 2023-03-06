import { createHash } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'

/**
 *
 * @param htmlPath
 * @param scriptPathInHtml
 * @param scriptPathOnDisk
 */
export const hashifyScriptPath = (htmlPath: string, scriptPathInHtml: string, scriptPathOnDisk: string) => {
  const html = readFileSync(htmlPath)
  const script = readFileSync(scriptPathOnDisk)
  const md5 = createHash('md5').update(script).digest('hex')
  const htmlString = html.toString('utf-8').replace(`src="${scriptPathInHtml}"`, `src="${scriptPathInHtml}?id=${md5}"`)
  const updatedBuffer = Buffer.from(htmlString)
  writeFileSync(htmlPath, updatedBuffer)
}
