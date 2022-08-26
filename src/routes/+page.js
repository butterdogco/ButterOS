import { get } from 'svelte/store'
import { db } from '$lib/stores'
import { getVersion } from '$lib/api'
import { variables } from '$lib/variables'

// export const router = true
// export const hydrate = true
// export const prerender = true

export const load = async (e) => {
	if (variables.GLOBAL_DEBUG) {
		console.log('+page.js')
	}

	const $db = get(db)
	const version_api = await getVersion(e.fetch).catch(error => console.error(error))
	const version_data = await version_api?.json().catch(error => console.error(error))
	const version = version_data?.version || $db?.version || 0

	db.set({ ...$db, version })

	return { version }
}