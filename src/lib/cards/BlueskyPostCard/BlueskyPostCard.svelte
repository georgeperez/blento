<script lang="ts">
	import { getAdditionalUserData } from '$lib/helper';
	import { BlueskyPost } from '../../components/bluesky-post';

	const feed = getAdditionalUserData().recentPosts?.feed;

	$inspect(feed);
</script>

<div class="flex h-full flex-col justify-center-safe overflow-y-scroll p-4">
	{#if feed?.[0].post}
		<BlueskyPost showLogo showBookmark={false} feedViewPost={feed?.[0].post}></BlueskyPost>
		<div class="h-4 w-full"></div>
	{:else}
		Your latest bluesky post will appear here.
	{/if}
</div>
