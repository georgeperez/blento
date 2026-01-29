<script lang="ts">
	import type { Item } from '$lib/types';
	import type { SettingsComponentProps } from '../types';
	import { Input, Label } from '@foxui/core';

	let { item = $bindable<Item>(), onclose }: SettingsComponentProps = $props();

	function confirmUrl() {
		let href = item.cardData.href?.trim() || '';
		if (href && !/^https?:\/\//i.test(href) && !href.startsWith('#')) {
			href = 'https://' + href;
		}
		item.cardData.href = href;
		onclose();
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col gap-1">
		<Label for="button-href" class="text-sm">Link</Label>
		<Input
			id="button-href"
			bind:value={item.cardData.href}
			placeholder="youtube.com"
			class="text-sm mt-2"
			onkeydown={(event) => {
				if (event.code === 'Enter') {
					event.preventDefault();
					confirmUrl();
				}
			}}
		/>
	</div>
</div>
