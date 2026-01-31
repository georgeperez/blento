import { COLUMNS } from '$lib';
import { CardDefinitionsByType } from '$lib/cards';
import { clamp, fixAllCollisions } from '$lib/helper';
import type { Item } from '$lib/types';

/**
 * Returns true when mirroring should still happen (i.e. user hasn't edited both layouts).
 * editedOn: 0/undefined = never, 1 = desktop only, 2 = mobile only, 3 = both
 */
export function shouldMirror(editedOn: number | undefined): boolean {
	return (editedOn ?? 0) !== 3;
}

/** Snap a value to the nearest even integer (min 2). */
function snapEven(v: number): number {
	return Math.max(2, Math.round(v / 2) * 2);
}

/**
 * Compute the other layout's size for a single item, preserving aspect ratio.
 * Clamps to the card definition's minW/maxW/minH/maxH if defined.
 * Mutates the item in-place.
 */
export function mirrorItemSize(item: Item, fromMobile: boolean): void {
	const def = CardDefinitionsByType[item.cardType];
	const minW = def?.minW ?? 2;
	const maxW = def?.maxW ?? COLUMNS;
	const minH = def?.minH ?? 2;
	const maxH = def?.maxH ?? Infinity;

	if (fromMobile) {
		const srcW = item.mobileW;
		const srcH = item.mobileH;
		// Full-width cards stay full-width
		item.w = srcW >= COLUMNS ? COLUMNS : clamp(snapEven(srcW / 2), minW, maxW);
		item.h = clamp(snapEven((srcH * item.w) / srcW), minH, maxH);
	} else {
		const srcW = item.w;
		const srcH = item.h;
		// Full-width cards stay full-width
		if (srcW >= COLUMNS) {
			item.mobileW = clamp(COLUMNS, minW, Math.min(maxW, COLUMNS));
		} else {
			const scaleFactor = Math.min(2, COLUMNS / srcW);
			item.mobileW = clamp(snapEven(srcW * scaleFactor), minW, Math.min(maxW, COLUMNS));
		}
		item.mobileH = clamp(snapEven((srcH * item.mobileW) / srcW), minH, maxH);
	}
}

/**
 * Mirror the full layout from one view to the other.
 * Copies sizes proportionally and maps positions, then resolves collisions.
 * Mutates items in-place.
 */
export function mirrorLayout(items: Item[], fromMobile: boolean): void {
	for (const item of items) {
		mirrorItemSize(item, fromMobile);

		if (fromMobile) {
			// Mobile → Desktop positions
			item.x = clamp(Math.floor(item.mobileX / 2 / 2) * 2, 0, COLUMNS - item.w);
			item.y = Math.max(0, Math.round(item.mobileY / 2));
		} else {
			// Desktop → Mobile positions
			item.mobileX = clamp(Math.floor((item.x * 2) / 2) * 2, 0, COLUMNS - item.mobileW);
			item.mobileY = Math.max(0, Math.round(item.y * 2));
		}
	}

	// Resolve collisions on the target layout
	fixAllCollisions(items, !fromMobile);
}
