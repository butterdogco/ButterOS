// noinspection NpmUsedModulesInstalled,JSUnusedGlobalSymbols

import { sveltekit } from '@sveltejs/kit/vite'
// import legacy from '@vitejs/plugin-legacy'

const isProd = process.env.NODE_ENV === 'production'
const legacy = () => {}
const useBabel = false
const sourceMapsInProduction = true

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		useBabel && legacy({
			targets: ['defaults', 'IE 11']
		})
	],
	build: {
		sourcemap: isProd && sourceMapsInProduction
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;',
			}
		}
	}
}

export default config