import { loadData } from '$lib/website/load.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, platform }) {
	if (!platform?.env?.USER_DATA_CACHE) return json('no cache');
	const handle = params.handle;

	await loadData(handle, platform, true);

	return json('ok');
}
