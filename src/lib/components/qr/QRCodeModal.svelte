<script lang="ts">
	import { Modal, Button, toast } from '@foxui/core';
	import QRCodeDisplay from './QRCodeDisplay.svelte';

	export type QRContext = {
		title?: string;
		icon?: string;
		iconColor?: string;
		favicon?: string;
		avatar?: string;
	};

	let {
		open = $bindable(false),
		href,
		context = {}
	}: {
		open: boolean;
		href: string;
		context?: QRContext;
	} = $props();

	async function copyUrl() {
		try {
			await navigator.clipboard.writeText(href);
			toast.success('URL copied!');
		} catch {
			toast.error('Failed to copy');
		}
	}
</script>

<Modal bind:open closeButton={true} class="max-w-sm">
	<div class="flex flex-col items-center gap-4 p-2">
		{#if context.icon}
			<div
				class="flex size-14 items-center justify-center rounded-2xl [&_svg]:size-8 [&_svg]:fill-white"
				style:background-color={context.iconColor ? `#${context.iconColor}` : '#000'}
			>
				{@html context.icon}
			</div>
		{:else if context.avatar}
			<img src={context.avatar} alt="" class="size-14 rounded-full object-cover" />
		{:else if context.favicon}
			<img src={context.favicon} alt="" class="size-10 rounded-lg object-cover" />
		{/if}

		{#if context.title}
			<div class="text-base-900 dark:text-base-100 text-lg font-semibold">
				{context.title}
			</div>
		{/if}

		<div class="overflow-hidden rounded-2xl">
			<QRCodeDisplay url={href} size={280} />
		</div>

		<div class="flex w-full items-center gap-2">
			<div
				class="bg-base-100 dark:bg-base-800 text-base-600 dark:text-base-400 flex-1 truncate rounded-lg px-3 py-2 text-sm"
			>
				{href}
			</div>
			<Button onclick={copyUrl} variant="ghost" size="sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
					/>
				</svg>
			</Button>
		</div>
	</div>
</Modal>
