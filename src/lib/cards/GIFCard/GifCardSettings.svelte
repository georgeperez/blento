<script lang="ts">
	import type { Item } from '$lib/types';
	import type { SettingsComponentProps } from '../types';
	import { Button, Input, Label } from '@foxui/core';

	let { item = $bindable<Item>() }: SettingsComponentProps = $props();

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
		isSearchOpen = false;
		searchQuery = '';
		searchResults = [];
	}
</script>

<div class="flex flex-col gap-3">
	<div>
		<Label class="mb-1 text-xs">Search GIPHY</Label>
		<Button
			variant="secondary"
			class="w-full justify-start"
			onclick={() => (isSearchOpen = !isSearchOpen)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="mr-2 size-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			Search for GIFs
		</Button>
	</div>

	{#if isSearchOpen}
		<div class="flex flex-col gap-2">
			<Input
				bind:value={searchQuery}
				oninput={handleSearchInput}
				placeholder="Type to search..."
				class="w-full"
				autofocus
			/>
			{#if isLoading}
				<p class="text-base-500 text-xs">Searching...</p>
			{:else if searchResults.length > 0}
				<div class="grid max-h-48 grid-cols-2 gap-1 overflow-y-auto">
					{#each searchResults as gif}
						<button
							onclick={() => selectGif(gif)}
							class="overflow-hidden rounded transition-transform hover:scale-[1.02]"
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
				<p class="text-base-400 text-center text-xs">Powered by GIPHY</p>
			{:else if searchQuery}
				<p class="text-base-500 text-xs">No results found</p>
			{/if}
		</div>
	{/if}

	<div>
		<Label class="mb-1 text-xs">Alt text</Label>
		<Input bind:value={item.cardData.alt} placeholder="Description" class="w-full" />
	</div>
</div>
