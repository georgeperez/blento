<script lang="ts">
	import type { ContentComponentProps } from '../types';
	import PlainTextEditor from '$lib/components/PlainTextEditor.svelte';

	let { item = $bindable() }: ContentComponentProps = $props();
</script>

<div class="text-base-950 dark:text-base-50 flex h-full w-full flex-col items-center justify-center gap-2 px-4">
	<PlainTextEditor
		key="text"
		bind:contentDict={item.cardData}
		placeholder="Button text"
		class="line-clamp-1 text-center text-2xl font-bold"
	/>
</div>
