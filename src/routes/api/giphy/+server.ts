import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const q = url.searchParams.get('q');
	const offset = url.searchParams.get('offset') || '0';
	const limit = url.searchParams.get('limit') || '24';

	if (!q) {
		return json({ error: 'No search query provided' }, { status: 400 });
	}

	const apiKey = env.GIPHY_API_TOKEN;
	if (!apiKey) {
		return json({ error: 'Giphy API not configured' }, { status: 500 });
	}

	const giphyUrl = new URL('https://api.giphy.com/v1/gifs/search');
	giphyUrl.searchParams.set('api_key', apiKey);
	giphyUrl.searchParams.set('q', q);
	giphyUrl.searchParams.set('limit', limit);
	giphyUrl.searchParams.set('offset', offset);
	giphyUrl.searchParams.set('rating', 'g');
	giphyUrl.searchParams.set('lang', 'en');

	try {
		const response = await fetch(giphyUrl.toString());
		if (!response.ok) {
			throw new Error(`Giphy API error: ${response.status}`);
		}
		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching from Giphy:', error);
		return json({ error: 'Failed to fetch from Giphy' }, { status: 500 });
	}
}
