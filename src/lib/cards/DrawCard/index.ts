import type { CardDefinition } from '../types';
import DrawCard from './DrawCard.svelte';
import EditingDrawCard from './EditingDrawCard.svelte';

export const DrawCardDefinition = {
	type: 'draw',
	name: 'Drawing',
	contentComponent: DrawCard,
	editingContentComponent: EditingDrawCard,
	sidebarButtonText: 'Draw',
	defaultColor: 'base',
	allowSetColor: true,
	minW: 2,
	minH: 2,
	createNew: (item) => {
		item.w = 4;
		item.h = 4;
		item.mobileW = 4;
		item.mobileH = 4;
		item.cardData = {
			strokesJson: '[]',
			viewBox: '',
			strokeWidth: 1,
			locked: true
		};
	}
} as CardDefinition & { type: 'draw' };
