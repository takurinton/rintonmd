const { build } = require('esbuild');

build({
  entryPoints: ['./index.ts'], 
  outbase: './src',
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  external: [], 
  watch: false,
});