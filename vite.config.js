import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

// Automatically find all HTML files
const htmlFiles = {}
const files = glob.sync('src/**/*.html')

files.forEach(file => {
    const name = file.replace('src/', '').replace('.html', '').replace(/\//g, '_')
    htmlFiles[name] = resolve(__dirname, file)
})

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Include root index.html if it exists
        main: resolve(__dirname, 'index.html'),
        // Include all HTML files from src
        ...htmlFiles,
      },
      output: {
        // Preserve folder structure in dist
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
  },
  base: './', // Use relative paths
})