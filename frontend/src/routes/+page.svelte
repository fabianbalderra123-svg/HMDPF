<script lang="ts">
	import { onMount } from 'svelte';
	import GamePanel from '$lib/components/GamePanel.svelte';
	import XboxHud from '$lib/components/XboxHud.svelte';
	import { createGallery } from '$lib/gallery/scene';
	import { games, type Game, type Genre } from '$lib/gallery/games';

	let canvas: HTMLCanvasElement;
	let selectedGame: Game | null = $state(null);
	let hoveredGame: Game | null = $state(null);
	let selectedGenre: Genre = $state('Todos');
	let searchQuery: string = $state('');

	onMount(() => {
		return createGallery(
			canvas,
			(g) => {
				selectedGame = g;
			},
			(g) => {
				hoveredGame = g;
			}
		);
	});
</script>

<svelte:head>
	<title>Xbox 360 Vault | Descubrimiento Interactivo de Videojuegos</title>
	<meta
		name="description"
		content="Explora el legendario catálogo de videojuegos de Xbox 360 a través de un universo visual 3D interactivo con detalles técnicos, Gamerscore y modos de juego."
	/>
</svelte:head>

<div class="relative h-dvh w-full overflow-hidden bg-[#050705] select-none">
	<!-- Interactive 3D Voronoi Canvas -->
	<canvas bind:this={canvas} class="block h-full w-full cursor-crosshair"></canvas>

	<!-- Xbox 360 HUD: Top Header, Search, Filter Pills & Bottom Guide -->
	<XboxHud
		{games}
		bind:selectedGenre
		bind:searchQuery
		onSelectGame={(g) => {
			selectedGame = g;
		}}
	/>

	<!-- Game Details Sliding Glass Panel -->
	{#if selectedGame}
		<GamePanel game={selectedGame} onclose={() => (selectedGame = null)} />
	{/if}

	<!-- Floating Live Hover Badge (Bottom Left) -->
	{#if hoveredGame && !selectedGame}
		<div class="pointer-events-none fixed bottom-16 left-4 z-20 hidden items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-zinc-950/80 px-3.5 py-2 shadow-xl backdrop-blur-md sm:flex">
			<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#107c10] text-[10px] font-black text-white">
				G
			</span>
			<span class="text-xs font-semibold text-white">
				{hoveredGame.title}
			</span>
			<span class="text-xs text-zinc-400">({hoveredGame.year})</span>
			<span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
				{hoveredGame.genre}
			</span>
		</div>
	{/if}
</div>
