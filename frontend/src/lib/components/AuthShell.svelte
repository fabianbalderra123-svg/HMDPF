<script lang="ts">
	import type { Snippet } from 'svelte';
	import BrandMark from './BrandMark.svelte';

	let { title, subtitle, children, footer }: { title: string; subtitle: string; children: Snippet; footer?: Snippet } =
		$props();
</script>

<div class="relative isolate min-h-dvh overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.08),_transparent_42%),linear-gradient(180deg,#f8fafc_0%,#eef2f6_100%)]"
		aria-hidden="true"
	></div>

	<a
		href="#contenido-principal"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm"
	>
		Saltar al contenido
	</a>

	<div class="relative mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:px-8">
		<section class="hidden lg:block" aria-hidden="true">
			<BrandMark />
			<h1 class="mt-10 max-w-md text-4xl font-semibold tracking-tight text-ink">
				Un acceso limpio para administrar tu operación.
			</h1>
			<p class="mt-4 max-w-md text-base leading-7 text-muted">
				Inicia sesión para continuar. El diseño está pensado para escritorio y móvil, con foco en
				claridad y accesibilidad.
			</p>
		</section>

		<main id="contenido-principal" class="mx-auto w-full max-w-md">
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-8">
				<div class="mb-8 lg:hidden">
					<BrandMark />
				</div>
				<h2 class="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
				<p class="mt-1.5 text-sm text-muted">{subtitle}</p>
				<div class="mt-8">
					{@render children()}
				</div>
			</div>
			{#if footer}
				<div class="mt-6 text-center text-sm text-muted">
					{@render footer()}
				</div>
			{/if}
		</main>
	</div>
</div>
