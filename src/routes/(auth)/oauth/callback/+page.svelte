<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/atproto';

	$effect(() => {
		console.log('hello', user);
		if (user.profile) {
			goto('/' + user.profile.handle + '/edit', {});
		}
	});
</script>

<div class="flex min-h-screen w-full items-center justify-center text-3xl">Loading...</div>
