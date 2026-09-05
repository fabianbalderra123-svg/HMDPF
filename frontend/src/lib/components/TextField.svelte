<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		id,
		name,
		label,
		type = 'text',
		value = $bindable(''),
		autocomplete = 'off',
		placeholder = '',
		error = '',
		disabled = false,
		required = false
	}: {
		id: string;
		name: string;
		label: string;
		type?: 'text' | 'email' | 'password';
		value?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		placeholder?: string;
		error?: string;
		disabled?: boolean;
		required?: boolean;
	} = $props();

	let showPassword = $state(false);
	const describedBy = $derived(error ? `${id}-error` : undefined);
	const inputType = $derived(type === 'password' && showPassword ? 'text' : type);
</script>

<div class="grid gap-1.5">
	<label class="text-sm font-medium text-ink" for={id}>
		{label}
		{#if required}
			<span class="text-danger" aria-hidden="true">*</span>
		{/if}
	</label>

	<div class="relative">
		<input
			{id}
			{name}
			type={inputType}
			{autocomplete}
			{placeholder}
			{disabled}
			{required}
			bind:value
			aria-invalid={error ? 'true' : 'false'}
			aria-describedby={describedBy}
			class="h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 {type ===
			'password'
				? 'pr-12'
				: ''} {error
				? 'border-danger/40 ring-1 ring-danger/20'
				: 'border-line hover:border-slate-300 focus:border-brand focus:ring-2 focus:ring-brand/15'}"
		/>

		{#if type === 'password'}
			<button
				type="button"
				class="absolute inset-y-0 right-1.5 my-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-slate-100 hover:text-ink"
				onclick={() => (showPassword = !showPassword)}
				aria-pressed={showPassword}
				aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
				tabindex={disabled ? -1 : 0}
			>
				{#if showPassword}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M3 3l18 18M10.5 10.7A3 3 0 0 0 13.3 13.5M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.5 4.5 10.5 6-0.4.6-1.1 1.6-2.2 2.6M6.1 6.3C4.2 7.6 2.8 9.4 1.5 11c1.8 2.6 5.4 6 10.5 6 1.3 0 2.5-.2 3.6-.6"
							stroke="currentColor"
							stroke-width="1.7"
							stroke-linecap="round"
						/>
					</svg>
				{:else}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
							stroke="currentColor"
							stroke-width="1.7"
						/>
						<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7" />
					</svg>
				{/if}
			</button>
		{/if}
	</div>

	{#if error}
		<p id="{id}-error" class="text-sm text-danger" role="alert">{error}</p>
	{/if}
</div>
