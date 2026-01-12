import { loadData } from '$lib/website/load';
import { ImageResponse } from '@ethercorps/sveltekit-og';

export async function GET({ params, platform }) {
	const handle = params.handle;
	const data = await loadData(params.handle, platform);

	console.log(data.data['app.bsky.actor.profile'].self);
	const image =
		'https://cdn.bsky.app/img/avatar/plain/' +
		data.did +
		'/' +
		data.data['app.bsky.actor.profile'].self.value.avatar.ref.$link;

	const htmlString = `
<div tw="flex flex-col justify-center p-8 w-full h-full bg-neutral-900">
<div tw="flex items-center mb-8">
      <img src="${image}" width="128" height="128" tw="rounded-full" />

	<h1 tw="text-neutral-50 text-7xl ml-4">${handle}</h1>
    </div>
	<p tw="mt-8 text-4xl text-neutral-300">Welcome to my blento</p>


	<div tw="w-20 h-20 rounded-xl bg-rose-700 text-transparent absolute top-50 right-20">h</div>
	<div tw="w-20 h-40 rounded-xl bg-rose-400 text-transparent absolute top-74 right-20">h</div>
	<div tw="w-40 h-40 rounded-xl bg-rose-300 text-transparent absolute top-50 right-44">h</div>
	<div tw="w-20 h-40 rounded-xl bg-rose-600 text-transparent absolute top-50 right-88">h</div>
	<div tw="w-40 h-20 rounded-xl bg-rose-500 text-transparent absolute top-94 right-68">h</div>
</div>
`;

	// <div tw="w-20 h-20 rounded-xl bg-cyan-500 text-transparent absolute top-50 right-20">h</div>
	// <div tw="w-20 h-40 rounded-xl bg-rose-500 text-transparent absolute top-74 right-20">h</div>
	// <div tw="w-40 h-40 rounded-xl bg-emerald-500 text-transparent absolute top-50 right-44">h</div>
	// <div tw="w-20 h-40 rounded-xl bg-amber-500 text-transparent absolute top-50 right-88">h</div>
	// <div tw="w-40 h-20 rounded-xl bg-pink-500 text-transparent absolute top-94 right-68">h</div>
	return new ImageResponse(htmlString, {
		width: 1200,
		height: 630
	});
}
