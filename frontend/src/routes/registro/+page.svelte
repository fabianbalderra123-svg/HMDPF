<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import AuthShell from '$lib/components/AuthShell.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextField from '$lib/components/TextField.svelte';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errors = $state({ name: '', email: '', password: '' });
	let loading = $state(false);
	let submitted = $state(false);

	function validate() {
		errors = {
			name: name.trim() ? '' : 'Ingresa tu nombre.',
			email: email.trim() ? '' : 'Ingresa tu correo electrónico.',
			password: password.trim() ? '' : 'Ingresa una contraseña.'
		};
		return !errors.name && !errors.email && !errors.password;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = false;
		if (!validate()) return;
		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		loading = false;
		submitted = true;
	}
</script>

<svelte:head>
	<title>Crear cuenta · HMDPF</title>
</svelte:head>

<AuthShell title="Crear cuenta" subtitle="Completa los campos para registrarte. Esta pantalla es una simulación.">
	<form class="grid gap-5" novalidate aria-busy={loading} onsubmit={handleSubmit}>
		<TextField
			id="name"
			name="name"
			label="Nombre"
			autocomplete="name"
			required
			disabled={loading}
			bind:value={name}
			error={errors.name}
		/>
		<TextField
			id="email"
			name="email"
			label="Correo electrónico"
			type="email"
			autocomplete="email"
			required
			disabled={loading}
			bind:value={email}
			error={errors.email}
		/>
		<TextField
			id="password"
			name="password"
			label="Contraseña"
			type="password"
			autocomplete="new-password"
			required
			disabled={loading}
			bind:value={password}
			error={errors.password}
		/>
		{#if submitted}
			<Alert tone="success">Registro simulado. No se creó ninguna cuenta real.</Alert>
		{/if}
		<Button type="submit" {loading} loadingText="Creando cuenta…">Crear cuenta</Button>
	</form>

	{#snippet footer()}
		<p>
			¿Ya tienes cuenta?
			<a class="font-medium text-brand hover:text-brand-hover hover:underline" href="/">Iniciar sesión</a>
		</p>
	{/snippet}
</AuthShell>
