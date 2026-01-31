<script lang="ts">
	import { AllCardDefinitions } from '$lib/cards';
	import type { CardDefinition } from '$lib/cards/types';
	import { Command, Dialog } from 'bits-ui';

	const CardDefGroups = [
		'Core',
		...Array.from(
			new Set(
				AllCardDefinitions.map((cardDef) => cardDef.groups)
					.flat()
					.filter((g) => g)
			)
		)
			.sort()
			.filter((g) => g !== 'Core')
	];

	let {
		open = $bindable(false),
		onselect
	}: { open: boolean; onselect: (cardDef: CardDefinition) => void } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = true;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-36 left-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] outline-hidden sm:max-w-lg md:w-full"
		>
			<Dialog.Title class="sr-only">Command Menu</Dialog.Title>
			<Dialog.Description class="sr-only">
				This is the command menu. Use the arrow keys to navigate and press ⌘K to open the search
				bar.
			</Dialog.Description>
			<Command.Root
				class="border-base-200 dark:border-base-800 mx-auto flex h-full w-full max-w-[90vw] flex-col overflow-hidden rounded-2xl border bg-white dark:bg-black"
			>
				<Command.Input
					class="focus-override placeholder:text-base-900/50 dark:placeholder:text-base-50/50 border-base-200 dark:border-base-800 bg-base-100 mx-1 mt-1 inline-flex truncate rounded-2xl rounded-tl-2xl px-4 text-sm transition-colors focus:ring-0 focus:outline-hidden dark:bg-black"
					placeholder="Search for a card..."
				/>
				<Command.List
					class="focus:outline-accent-500/50 max-h-[50vh] overflow-x-hidden overflow-y-auto rounded-br-2xl rounded-bl-2xl bg-white px-2 pb-2 focus:border-0 dark:bg-black"
				>
					<Command.Viewport>
						<Command.Empty
							class="text-base-900 dark:text-base-100 flex w-full items-center justify-center pt-8 pb-6 text-sm"
						>
							No results found.
						</Command.Empty>

						{#each CardDefGroups as group, index}
							{#if group && AllCardDefinitions.some((cardDef) => cardDef.groups?.includes(group))}
								<Command.Group>
									<Command.GroupHeading
										class="text-base-600 dark:text-base-400 px-3 pt-4 pb-2 text-xs"
									>
										{group}
									</Command.GroupHeading>
									<Command.GroupItems>
										{#each AllCardDefinitions.filter( (cardDef) => cardDef.groups?.includes(group) ) as cardDef}
											<Command.Item
												onSelect={() => {
													open = false;
													onselect(cardDef);
												}}
												class="rounded-button data-selected:bg-accent-500/10 flex h-10 cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm outline-hidden select-none"
												keywords={[group, cardDef.type, ...(cardDef.keywords || [])]}
											>
												{#if cardDef.icon}
													<div class="text-base-700 dark:text-base-300">
														{@html cardDef.icon}
													</div>
												{/if}
												{cardDef.name}
											</Command.Item>
										{/each}
									</Command.GroupItems>
								</Command.Group>
								{#if index < CardDefGroups.length - 1}
									<Command.Separator class="bg-base-900/5 dark:bg-base-50/5 my-1 h-px w-full" />
								{/if}
							{/if}
						{/each}
					</Command.Viewport>
				</Command.List>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
