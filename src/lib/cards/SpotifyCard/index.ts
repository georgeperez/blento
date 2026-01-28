import type { CardDefinition } from '../types';
import CreateSpotifyCardModal from './CreateSpotifyCardModal.svelte';
import SpotifyCard from './SpotifyCard.svelte';

const cardType = 'spotify-list-embed';

export const SpotifyCardDefinition = {
	type: cardType,
	contentComponent: SpotifyCard,
	creationModalComponent: CreateSpotifyCardModal,
	sidebarButtonText: 'Spotify Embed',

	createNew: (item) => {
		item.cardType = cardType;
		item.cardData = {};
		item.w = 4;
		item.mobileW = 8;
		item.h = 5;
		item.mobileH = 10;
	},

	onUrlHandler: (url, item) => {
		const match = matchSpotifyUrl(url);
		if (!match) return null;

		item.cardData.spotifyType = match.type;
		item.cardData.spotifyId = match.id;
		item.cardData.href = url;

		item.w = 4;
		item.mobileW = 8;
		item.h = 5;
		item.mobileH = 10;

		return item;
	},

	urlHandlerPriority: 2,

	name: 'Spotify Embed',
	canResize: true,
	minW: 4,
	minH: 5
} as CardDefinition & { type: typeof cardType };

// Match Spotify album and playlist URLs
// Examples:
// https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3
// https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
function matchSpotifyUrl(
	url: string | undefined
): { type: 'album' | 'playlist'; id: string } | null {
	if (!url) return null;

	const pattern = /open\.spotify\.com\/(album|playlist)\/([a-zA-Z0-9]+)/;
	const match = url.match(pattern);

	if (match) {
		return {
			type: match[1] as 'album' | 'playlist',
			id: match[2]
		};
	}

	return null;
}
