import { build, files, version } from '$service-worker'

const ASSETS = `cache${version}`

// console.log(files)

// `build` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache = build.concat(files.filter(file => !file.startsWith('/.nojekyll') && !file.startsWith('/_config.yml') && !file.startsWith('/CNAME') && !file.startsWith('/vite-manifest.json')))

console.log(to_cache)

const staticAssets = new Set(to_cache)

self.addEventListener('install', event => {
	try {
		// noinspection JSUnresolvedFunction
		event.waitUntil(
			caches.open(ASSETS).then(cache => cache.addAll(to_cache)).then(() => {
				// noinspection JSIgnoredPromiseFromCall
				self.skipWaiting()
			})
		)
	} catch (err) {
		console.error(err)
	}
})

self.addEventListener('activate', event => {
	try {
		// noinspection JSUnresolvedFunction
		event.waitUntil(
			caches.keys().then(async keys => {
				// delete old caches
				for (const key of keys) {
					if (key !== ASSETS) await caches.delete(key)
				}

				await self.clients.claim()
			})
		)
	} catch (err) {
		console.error(err)
	}
})

async function fetchAndCache(request) {
	const cache = await caches.open(`offline${version}`)

	try {
		const response = await fetch(request)
		// noinspection JSCheckFunctionSignatures
		await cache.put(request, response.clone())

		return response
	} catch (err) {
		console.error(err)

		const response = await cache.match(request)

		if (response) return response
	}
}

self.addEventListener('fetch', event => {
	// noinspection JSUnresolvedVariable
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return

	// noinspection JSUnresolvedVariable
	const url = new URL(event.request.url)

	// don't try to handle e.g. data: URIs
	const isHttp = url.protocol.startsWith('http')
	const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port
	const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname)
	// noinspection JSUnresolvedVariable
	const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset

	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		// noinspection JSUnresolvedFunction
		event.respondWith((async () => {
			// always serve static files and bundler-generated assets from cache.
			// if your application has other URLs with data that will never change,
			// set this variable to true for them and they will only be fetched once.
			// @ts-ignore
			// noinspection JSUnresolvedVariable
			const cachedAsset = isStaticAsset && await caches.match(event.request)

			// noinspection JSUnresolvedVariable
			return cachedAsset || fetchAndCache(event.request)
		})())
	}
})