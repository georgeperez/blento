import { BlueskyPostCardDefinition } from './BlueskyPostCard';
import { EmbedCardDefinition } from './EmbedCard';
import { ImageCardDefinition } from './ImageCard';
import { LinkCardDefinition } from './LinkCard';
import { LivestreamCardDefitition, LivestreamEmbedCardDefitition } from './LivestreamCard';
import { UpdatedBlentosCardDefitition } from './SpecialCards/UpdatedBlentos';
import { TextCardDefinition } from './TextCard';
import type { CardDefinition } from './types';
import { YoutubeCardDefinition } from './YoutubeVideo';

export const AllCardDefinitions = [
	ImageCardDefinition,
	TextCardDefinition,
	LinkCardDefinition,
	UpdatedBlentosCardDefitition,
	YoutubeCardDefinition,
	BlueskyPostCardDefinition,
	LivestreamCardDefitition,
	LivestreamEmbedCardDefitition,
	EmbedCardDefinition
] as const;

export const CardDefinitionsByType = AllCardDefinitions.reduce(
	(acc, item) => {
		acc[item.type] = item;
		return acc;
	},
	{} as Record<string, CardDefinition>
);
