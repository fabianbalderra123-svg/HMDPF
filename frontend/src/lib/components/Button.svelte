<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		type = 'button',
		loading = false,
		loadingText = 'Cargando…',
		disabled = false,
		variant = 'primary',
		children,
		...rest
	}: {
		type?: HTMLButtonAttributes['type'];
		loading?: boolean;
		loadingText?: string;
		disabled?: boolean;
		variant?: 'primary' | 'ghost';
		children: Snippet;
	} & Omit<HTMLButtonAttributes, 'type' | 'disabled' | 'children'> = $props();

	const base =
		'inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed';
	const styles = {
		primary:
			'bg-brand text-white shadow-sm hover:bg-brand-hover disabled:bg-slate-300 disabled:text-slate-500',
		ghost: 'bg-transparent text-muted hover:bg-slate-100 hover:text-ink'
	};
</script>

<button
	{type}
	class="{base} {styles[variant]}"
	disabled={disabled || loading}
	aria-busy={loading}
	{...rest}
>
	{#if loading}
		<span
			class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
			aria-hidden="true"
		></span>
		<span>{loadingText}</span>
	{:else}
		{@render children()}
	{/if}
</button>
