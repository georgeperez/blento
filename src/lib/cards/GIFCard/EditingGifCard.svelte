<script lang="ts">
	import { getDidContext } from '$lib/website/context';
	import { getImageBlobUrl } from '$lib/oauth/utils';
	import type { ContentComponentProps } from '../types';

	let { item = $bindable() }: ContentComponentProps = $props();

	const did = getDidContext();

	let hasError = $state(false);
	let isSearchOpen = $state(false);
	let searchQuery = $state('');
	let searchResults = $state<
		Array<{
			id: string;
			title: string;
			images: {
				fixed_height: { url: string; width: string; height: string };
				original: { url: string };
			};
		}>
	>([]);
	let isLoading = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	function getSrc() {
		if (item.cardData.url) return item.cardData.url;

		if (item.cardData.image && typeof item.cardData.image === 'object') {
			return getImageBlobUrl({ did, link: item.cardData.image?.ref?.$link });
		}

		return item.cardData.image;
	}

	async function searchGiphy(query: string) {
		if (!query.trim()) {
			searchResults = [];
			return;
		}

		isLoading = true;
		try {
			const response = await fetch(`/api/giphy?q=${encodeURIComponent(query)}`);
			if (response.ok) {
				const data = await response.json();
				searchResults = data.data || [];
			}
		} catch (error) {
			console.error('Failed to search Giphy:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleSearchInput() {
		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			searchGiphy(searchQuery);
		}, 300);
	}

	function selectGif(gif: (typeof searchResults)[0]) {
		item.cardData.url = gif.images.original.url;
		item.cardData.alt = gif.title;
		hasError = false;
		isSearchOpen = false;
		searchQuery = '';
		searchResults = [];
	}

	function openSearch() {
		isSearchOpen = true;
	}

	function closeSearch() {
		isSearchOpen = false;
		searchQuery = '';
		searchResults = [];
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="relative h-full w-full overflow-hidden" onclick={openSearch}>
	{#if getSrc() && !hasError}
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src={getSrc()}
			alt={item.cardData.alt || 'GIF'}
			onerror={() => (hasError = true)}
		/>
	{:else}
		<!-- Empty state -->
		<div
			class="bg-base-100 dark:bg-base-900 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 p-4"
		>
			<div
				class="border-base-300 dark:border-base-700 flex size-12 items-center justify-center rounded-xl border-2 border-dashed"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="text-base-400 dark:text-base-600 size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
					/>
				</svg>
			</div>
			<div class="text-center">
				<p class="text-base-700 dark:text-base-300 text-sm font-medium">Click to search GIPHY</p>
			</div>
		</div>
	{/if}

	<!-- Giphy search modal -->
	{#if isSearchOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="absolute inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-center gap-2 p-3">
				<input
					bind:value={searchQuery}
					oninput={handleSearchInput}
					class="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 outline-none focus:border-white/40 focus:bg-white/20"
					placeholder="Search GIPHY..."
				/>
				<button
					onclick={closeSearch}
					aria-label="Close search"
					class="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Results grid -->
			<div class="flex-1 overflow-y-auto p-2">
				{#if isLoading}
					<div class="flex h-full items-center justify-center">
						<p class="text-white/60">Searching...</p>
					</div>
				{:else if searchResults.length > 0}
					<div class="grid grid-cols-2 gap-2">
						{#each searchResults as gif}
							<button
								onclick={() => selectGif(gif)}
								class="overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
							>
								<img
									src={gif.images.fixed_height.url}
									alt={gif.title}
									class="h-auto w-full"
									loading="lazy"
								/>
							</button>
						{/each}
					</div>
				{:else if searchQuery}
					<div class="flex h-full items-center justify-center">
						<p class="text-white/60">No results found</p>
					</div>
				{:else}
					<div class="flex h-full items-center justify-center">
						<p class="text-white/60">Type to search for GIFs</p>
					</div>
				{/if}
			</div>

			<!-- Giphy attribution -->
			<div class="p-2 text-center">
				<span class="text-xs text-white/40">Powered by GIPHY</span>
			</div>
		</div>
	{/if}
</div>
