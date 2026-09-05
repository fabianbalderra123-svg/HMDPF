<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import AuthShell from '$lib/components/AuthShell.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextField from '$lib/components/TextField.svelte';

	let email = $state('');
	let emailError = $state('');
	let loading = $state(false);
	let submitted = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = false;
		emailError = email.trim() ? '' : 'Ingresa tu correo electrónico.';
		if (emailError) return;
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		loading = false;
		submitted = true;
	}
</script>

<svelte:head>
	<title>Recuperar contraseña · HMDPF</title>
</svelte:head>

<AuthShell
	title="¿Olvidaste tu contraseña?"
	subtitle="Ingresa tu correo y te mostraremos un mensaje de confirmación simulado."
>
	<form class="grid gap-5" novalidate aria-busy={loading} onsubmit={handleSubmit}>
		<TextField
			id="email"
			name="email"
			label="Correo electrónico"
			type="email"
			autocomplete="email"
			required
			disabled={loading}
			bind:value={email}
			error={emailError}
		/>
		{#if submitted}
			<Alert tone="success">Si el correo existiera, enviaríamos un enlace. Esta demo no envía nada.</Alert>
		{/if}
		<Button type="submit" {loading} loadingText="Enviando…">Enviar instrucciones</Button>
	</form>

	{#snippet footer()}
		<p>
			<a class="font-medium text-brand hover:text-brand-hover hover:underline" href="/">Volver a iniciar sesión</a>
		</p>
	{/snippet}
</AuthShell>
