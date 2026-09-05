<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();
</script>

<div class="flex items-center gap-3">
	<div
		class="flex size-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm"
		aria-hidden="true"
	>
		<svg class="size-5" viewBox="0 0 24 24" fill="none">
			<path
				d="M5 7.5 12 4l7 3.5v6.2c0 3.4-2.9 5.9-7 7.3-4.1-1.4-7-3.9-7-7.3V7.5Z"
				stroke="currentColor"
				stroke-width="1.8"
				stroke-linejoin="round"
			/>
			<path
				d="M9 12.2 11.1 14.4 15.2 10"
				stroke="currentColor"
				stroke-width="1.8"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	<div class="leading-tight">
		<p class="text-base font-semibold tracking-tight text-ink">HMDPF</p>
		{#if !compact}
			<p class="text-sm text-muted">Administración</p>
		{/if}
	</div>
</div>
