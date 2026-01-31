import type { CardDefinition } from '../types';
import BlueskyMediaCard from './BlueskyMediaCard.svelte';
import CreateBlueskyMediaCardModal from './CreateBlueskyMediaCardModal.svelte';

export const BlueskyMediaCardDefinition = {
	type: 'blueskyMedia',
	contentComponent: BlueskyMediaCard,
	createNew: () => {},
	creationModalComponent: CreateBlueskyMediaCardModal,
	sidebarButtonText: 'Bluesky Media',
	canHaveLabel: true,

	groups: ['Media'],

	name: 'Video/Image from Bluesky'
} as CardDefinition & { type: 'blueskyMedia' };
