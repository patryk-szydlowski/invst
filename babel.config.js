/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const alias = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name)
  .reduce((acc, dir) => ({ ...acc, [dir]: path.resolve(__dirname, 'src', dir) }), {})

const extensions = [
  '.ts',
  '.tsx',
  '.ios.ts',
  '.ios.tsx',
  '.android.ts',
  '.android.tsx',
  '.web.ts',
  '.web.tsx',
]

module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [['module-resolver', { extensions, alias }]],
  }
}
