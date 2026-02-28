// build.js
import { readdirSync, copyFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Function to copy files maintaining directory structure
function copyFiles(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true })
  
  mkdirSync(dest, { recursive: true })

  for (let entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)

    if (entry.isDirectory()) {
      copyFiles(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

// Copy component HTML files to dist
copyFiles(join(__dirname, 'src/components'), join(__dirname, 'dist/src/components'))

// Copy utils folder to dist
copyFiles(join(__dirname, 'src/utils'), join(__dirname, 'dist/src/utils'))

// Also copy root index.html
copyFileSync(
  join(__dirname, 'index.html'),
  join(__dirname, 'dist/index.html')
)