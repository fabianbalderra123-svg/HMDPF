<script lang="ts">
	import type { Game, Genre } from '$lib/gallery/games';

	let {
		games,
		selectedGenre = $bindable('Todos'),
		searchQuery = $bindable(''),
		onSelectGame
	}: {
		games: Game[];
		selectedGenre: Genre;
		searchQuery: string;
		onSelectGame: (game: Game) => void;
	} = $props();

	const genres: Genre[] = ['Todos', 'Shooter', 'RPG', 'Acción', 'Terror', 'Carreras', 'Aventura'];

	let isSearchFocused = $state(false);

	const searchResults = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return [];
		return games.filter(
			(g) =>
				g.title.toLowerCase().includes(q) ||
				g.developer.toLowerCase().includes(q) ||
				g.genre.toLowerCase().includes(q) ||
				g.tagline.toLowerCase().includes(q)
		);
	});
</script>

<!-- Top Bar / Header HUD -->
<header class="pointer-events-none fixed inset-x-0 top-0 z-20 flex flex-col items-center gap-3 p-3 sm:p-4 md:p-6">
	<div class="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-md sm:px-6 sm:py-3">
		<!-- Brand: Xbox 360 Ring of Light -->
		<div class="flex items-center gap-3">
			<div class="relative flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 border border-emerald-500/40 shadow-[0_0_18px_rgba(16,124,16,0.65)]">
				<!-- 4 Ring of Light Quadrants -->
				<div class="absolute inset-1 rounded-full border border-emerald-400/80"></div>
				<div class="h-3 w-3 rounded-full bg-[#107c10] shadow-[0_0_8px_#52c41a]"></div>
				<div class="absolute h-full w-[2px] bg-zinc-950"></div>
				<div class="absolute w-full h-[2px] bg-zinc-950"></div>
			</div>

			<div>
				<div class="flex items-center gap-1.5">
					<h1 class="text-base font-black tracking-wider text-white sm:text-lg">
						XBOX <span class="text-[#52c41a]">360</span>
					</h1>
					<span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-emerald-400 uppercase">
						VAULT
					</span>
				</div>
				<p class="hidden text-[10px] tracking-wider text-zinc-400 uppercase sm:block">
					Explorador de Obras Maestras
				</p>
			</div>
		</div>

		<!-- Search Bar with Live Quick Match -->
		<div class="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
			<div class="relative flex items-center">
				<svg
					class="pointer-events-none absolute left-3.5 h-4 w-4 text-zinc-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>

				<input
					type="text"
					bind:value={searchQuery}
					onfocus={() => (isSearchFocused = true)}
					placeholder="Buscar Halo, Gears, RPG, Bethesda..."
					class="w-full rounded-xl border border-white/10 bg-black/60 py-2 pl-10 pr-9 text-xs text-white placeholder-zinc-500 shadow-inner transition focus:border-emerald-400/80 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
				/>

				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="absolute right-3 text-xs text-zinc-400 hover:text-white"
						aria-label="Borrar búsqueda"
					>
						✕
					</button>
				{/if}
			</div>

			<!-- Search Results Dropdown -->
			{#if isSearchFocused && searchQuery.trim() && searchResults.length > 0}
				<div class="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-xl border border-emerald-500/30 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl">
					<p class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
						Coincidencias ({searchResults.length})
					</p>
					{#each searchResults as match}
						<button
							type="button"
							class="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition hover:bg-emerald-950/50"
							onclick={() => {
								onSelectGame(match);
								isSearchFocused = false;
							}}
						>
							<div class="min-w-0">
								<p class="truncate text-xs font-semibold text-white">{match.title}</p>
								<p class="truncate text-[11px] text-zinc-400">{match.year} • {match.developer}</p>
							</div>
							<span class="shrink-0 rounded bg-[#107c10]/20 px-2 py-0.5 text-[10px] font-bold text-[#52c41a]">
								{match.gamerscore} G
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- System Status Badge -->
		<div class="hidden items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 px-3 py-1.5 lg:flex">
			<span class="h-2 w-2 rounded-full bg-[#52c41a] animate-pulse"></span>
			<span class="text-[11px] font-semibold tracking-wider text-emerald-300">
				{games.length} TÍTULOS
			</span>
		</div>
	</div>

	<!-- Genre Filter Navigation Pills -->
	<nav class="pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/70 p-1.5 shadow-lg backdrop-blur-md scrollbar-none">
		{#each genres as g}
			{@const active = selectedGenre === g}
			<button
				type="button"
				class="shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition duration-200 {active
					? 'bg-gradient-to-r from-[#107c10] to-[#3ca01a] text-white shadow-[0_0_15px_rgba(16,124,16,0.6)]'
					: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}"
				onclick={() => {
					selectedGenre = g;
				}}
			>
				{g}
			</button>
		{/each}
	</nav>
</header>

<!-- Bottom HUD / Gamepad Guide -->
<footer class="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex flex-col items-center justify-between gap-2 p-3 sm:flex-row sm:p-5">
	<!-- Classic Gamepad Action Buttons Prompts -->
	<div class="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2 text-[11px] text-zinc-300 shadow-xl backdrop-blur-md">
		<!-- A Button -->
		<div class="flex items-center gap-1.5">
			<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#107c10] font-black text-[10px] text-white shadow-[0_0_8px_rgba(16,124,16,0.8)]">
				A
			</span>
			<span>Abrir Ficha</span>
		</div>

		<span class="text-zinc-600">•</span>

		<!-- Y Button -->
		<div class="flex items-center gap-1.5">
			<span class="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 font-black text-[10px] text-black">
				Y
			</span>
			<span>Filtrar</span>
		</div>

		<span class="text-zinc-600">•</span>

		<span class="text-zinc-400">Mueve el cursor para deformar el universo 3D</span>
	</div>

	<!-- Generation Archival Stamp & Author Credit -->
	<div class="pointer-events-auto flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-zinc-950/80 px-4 py-1.5 text-[10px] tracking-wider text-zinc-400 backdrop-blur-md shadow-lg">
		<span class="text-zinc-500 uppercase">GENERACIÓN 7 • 2005 - 2013</span>
		<span class="text-emerald-500/50">•</span>
		<span class="font-semibold text-emerald-400">Por Fabian Balderrama</span>
	</div>
</footer>
