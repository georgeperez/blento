export const SITE = 'https://flo-bit.dev';

export const collections: string[] = [
	'app.blento.card',
	'app.blento.page',
	'app.blento.settings',
	'app.blento.comment',
	'app.blento.guestbook.entry',
	'site.standard.publication',
	'site.standard.document',
	'xyz.statusphere.status'
];

export const rpcCalls: Record<string, string | string[]> = {
	//'did:web:api.bsky.app#bsky_appview': ['app.bsky.actor.getProfile']
};

export const blobs = ['*/*'] as string | string[] | undefined;

export const signUpPDS = 'https://pds.rip/';
