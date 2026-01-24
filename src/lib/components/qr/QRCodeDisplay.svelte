<script lang="ts">
	import { onMount } from 'svelte';

	let { url, size = 280 }: { url: string; size?: number } = $props();

	let container: HTMLDivElement | undefined = $state();

	onMount(async () => {
		if (!container) return;

		const module = await import('qr-code-styling');
		const QRCodeStyling = module.default;

		const options: ConstructorParameters<typeof QRCodeStyling>[0] = {
			width: size,
			height: size,
			data: url,
			dotsOptions: {
				color: '#000',
				type: 'rounded'
			},
			backgroundOptions: {
				color: '#fff'
			},
			cornersSquareOptions: {
				type: 'extra-rounded'
			},
			cornersDotOptions: {
				type: 'dot'
			}
		};

		const qrCode = new QRCodeStyling(options);
		qrCode.append(container);
	});
</script>

<div bind:this={container} class="flex items-center justify-center"></div>
