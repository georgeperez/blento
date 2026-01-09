import { loadData } from '$lib/website/load';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function load({ params, platform }) {
	if (env.PUBLIC_IS_SELFHOSTED) error(404);
	const data = await loadData(params.handle, platform);
	return { ...data, handle: params.handle };
}
