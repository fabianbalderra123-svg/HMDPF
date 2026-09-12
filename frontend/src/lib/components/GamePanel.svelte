<script lang="ts">
	import type { Game } from '$lib/gallery/games';

	let { game, onclose }: { game: Game; onclose: () => void } = $props();
</script>

<aside
	class="pointer-events-auto absolute right-3 top-3 z-30 w-[min(100%-1.5rem,420px)] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-emerald-500/30 bg-zinc-950/90 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(16,124,16,0.2)] backdrop-blur-xl sm:right-6 sm:top-6"
	aria-label={game.title}
>
	<!-- Xbox 360 Header Banner -->
	<div class="relative overflow-hidden rounded-t-2xl border-b border-emerald-500/20 bg-gradient-to-b from-white via-zinc-200 to-zinc-300 px-5 py-3.5 text-zinc-900 shadow-inner">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2.5">
				<!-- Xbox Sphere Logo -->
				<div class="flex h-7 w-7 items-center justify-center rounded-full bg-[#107c10] shadow-[0_0_12px_rgba(16,124,16,0.6)]">
					<svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
						<circle cx="12" cy="12" r="10" fill="#107c10" stroke="#e0f8d0" stroke-width="1.5" />
						<path d="M6.5 7.5 C9 11, 15 11, 17.5 7.5" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
						<path d="M6.5 16.5 C9 13, 15 13, 17.5 16.5" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
					</svg>
				</div>
				<div>
					<span class="font-extrabold tracking-[0.2em] text-xs text-zinc-900">XBOX 360</span>
					<span class="ml-1.5 rounded bg-[#107c10]/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#107c10]">LIVE</span>
				</div>
			</div>

			<button
				type="button"
				class="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-xs font-semibold text-zinc-700 transition hover:bg-black/20 hover:text-zinc-950 active:scale-95"
				onclick={onclose}
				aria-label="Cerrar ficha"
			>
				✕
			</button>
		</div>

		<!-- Subtle vibrant accent strip -->
		<div class="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#107c10] via-[#52c41a] to-[#107c10]"></div>
	</div>

	<!-- Cover Art Header Area -->
	<div class="relative h-44 w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 p-5" style="filter:hue-rotate({game.hue}deg)">
		<!-- Dynamic decorative glow and grid -->
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,124,16,0.35),transparent_70%)]"></div>
		<div class="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>

		<div class="relative z-10 flex h-full flex-col justify-end">
			<span class="inline-block self-start rounded-md border border-emerald-400/40 bg-black/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-300 uppercase backdrop-blur-sm">
				{game.badge}
			</span>
			<p class="mt-2 text-xs font-medium italic text-zinc-200">
				"{game.tagline}"
			</p>
		</div>
	</div>

	<!-- Content Body -->
	<div class="space-y-4 p-5 sm:p-6">
		<div>
			<div class="flex items-center justify-between text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
				<span>{game.genre}</span>
				<span class="text-zinc-400">{game.year}</span>
			</div>
			<h2 class="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
				{game.title}
			</h2>
			<p class="mt-1 text-xs text-zinc-400">
				Desarrollado por <strong class="font-medium text-zinc-300">{game.developer}</strong> • Distribuido por {game.publisher}
			</p>
		</div>

		<!-- Quick Metric Badges -->
		<div class="grid grid-cols-2 gap-2.5 pt-1">
			<!-- Gamerscore -->
			<div class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#52c41a] text-xs font-black text-black shadow-[0_0_10px_rgba(82,196,26,0.5)]">
					G
				</div>
				<div>
					<p class="text-[10px] uppercase tracking-wider text-zinc-400">Gamerscore</p>
					<p class="text-sm font-bold text-emerald-300">{game.gamerscore} G</p>
				</div>
			</div>

			<!-- Metacritic Score -->
			<div class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#107c10] text-xs font-black text-white">
					{game.rating.replace('/100', '')}
				</div>
				<div>
					<p class="text-[10px] uppercase tracking-wider text-zinc-400">Metascore</p>
					<p class="text-sm font-bold text-white">Universal</p>
				</div>
			</div>
		</div>

		<!-- Multiplayer / Players info -->
		<div class="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3.5 py-2.5 text-xs text-emerald-200">
			<span class="font-semibold text-emerald-400">Modo de juego:</span> {game.players}
		</div>

		<!-- Synopsis -->
		<div>
			<h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">Sinopsis del juego</h3>
			<p class="mt-1.5 text-sm leading-relaxed text-zinc-300">
				{game.synopsis}
			</p>
		</div>

		<!-- Key Features -->
		<div>
			<h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">Características destacadas</h3>
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each game.features as feature}
					<span class="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
						{feature}
					</span>
				{/each}
			</div>
		</div>

		<!-- Retro Footer Info -->
		<div class="border-t border-white/10 pt-3 text-center text-[10px] text-zinc-500">
			XBOX 360™ • COMPATIBLE CON XBOX LIVE • POR FABIAN BALDERRAMA
		</div>
	</div>
</aside>
