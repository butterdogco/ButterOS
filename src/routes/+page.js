import { redirect, error } from '@sveltejs/kit'
import { get } from 'svelte/store'
import { db } from '$lib/stores'
import { getVersion } from '$lib/api'

// export const router = true
// export const hydrate = true
// export const prerender = true

export const load = async ({ fetch }) => {
	console.log('+page.js')
	console.log(redirect)
	console.log(error)

	const version_api = await getVersion(fetch).catch(error => console.error(error))
	const version_data = await version_api?.json().catch(error => console.error(error))

	return { version: typeof version_data !== 'undefined' ? version_data?.version || 0 : get(db)?.version || 0 }
}