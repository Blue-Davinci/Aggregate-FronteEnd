<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let pickerContainer;

	function onEmojiSelected(event) {
		dispatch('emoji', { emoji: event.detail.unicode });
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			import('emoji-picker-element').then((module) => {
				if (!customElements.get('emoji-picker')) {
					customElements.define('emoji-picker', module.default);
				}

				const picker = document.createElement('emoji-picker');
				picker.addEventListener('emoji-click', onEmojiSelected);
				pickerContainer.appendChild(picker);
			});
		}
	});
</script>

<!-- Apply Tailwind CSS classes directly -->
<div bind:this={pickerContainer} class="relative z-10"></div>
