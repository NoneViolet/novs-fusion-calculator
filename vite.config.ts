import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({typescript: true}),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
