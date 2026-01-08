import { client } from '$lib/oauth';
import EmbedCard from '../EmbedCard/EmbedCard.svelte';
import type { CardDefinition } from '../types';
import LivestreamCard from './LivestreamCard.svelte';
import SidebarItemEmbedLivestreamCard from './SidebarItemEmbedLivestreamCard.svelte';
import SidebarItemLivestreamCard from './SidebarItemLivestreamCard.svelte';

export const LivestreamCardDefitition = {
	type: 'latestLivestream',
	contentComponent: LivestreamCard,
	sidebarComponent: SidebarItemLivestreamCard,
	createNew: (card) => {
		card.w = 2;
		card.h = 1;
		card.mobileH = 2;
		card.mobileW = 4;
	}
} as CardDefinition & { type: 'latestLivestream' };

export const LivestreamEmbedCardDefitition = {
	type: 'livestreamEmbed',
	contentComponent: EmbedCard,
	sidebarComponent: SidebarItemEmbedLivestreamCard,
	createNew: (card) => {
		card.w = 2;
		card.h = 1;
		card.mobileH = 2;
		card.mobileW = 4;

		card.cardData = {
			href: 'https://stream.place/embed/' + client.profile?.handle
		};
	}
} as CardDefinition & { type: 'livestreamEmbed' };
