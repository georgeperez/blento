import { loadData } from '$lib/website/load';
import { env } from '$env/dynamic/public';

export async function load({ platform }) {
	const data = await loadData(env.PUBLIC_HANDLE, platform);
	return { ...data, handle: env.PUBLIC_HANDLE };
}
