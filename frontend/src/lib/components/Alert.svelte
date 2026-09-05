<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		tone = 'info',
		children
	}: {
		tone?: 'info' | 'success' | 'error';
		children: Snippet;
	} = $props();

	const styles = {
		info: 'border-line bg-slate-50 text-ink',
		success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
		error: 'border-red-200 bg-red-50 text-danger'
	};
</script>

<div class="rounded-xl border px-3.5 py-3 text-sm {styles[tone]}" role="status">
	{@render children()}
</div>
