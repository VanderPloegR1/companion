import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import * as envCompatible from 'vite-plugin-env-compatible'

// const upstreamUrl = '127.0.0.1:8000'
const upstreamUrl = 'companion.ct.julus.uk:8000'

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: 'public',
	// This changes the out put dir from dist to build
	// comment this out if that isn't relevant for your project
	build: {
		outDir: 'build',
		chunkSizeWarningLimit: 1 * 1000 * 1000, // Disable warning about large chunks
	},
	server: {
		proxy: {
			'/int': `http://${upstreamUrl}`,
			'/docs': `http://${upstreamUrl}`,
			'/socket.io': {
				target: `ws://${upstreamUrl}`,
				ws: true,
			},
		},
	},
	plugins: [
		reactPlugin(),
		envCompatible.default({
			prefix: 'DEV',
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
		},
	},

	resolve: {
		alias: {
			'react-windowed-select': 'react-windowed-select/dist/main.js',
		},
	},
})
