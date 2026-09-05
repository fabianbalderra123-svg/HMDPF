<script lang="ts">
	import Alert from './Alert.svelte';
	import Button from './Button.svelte';
	import TextField from './TextField.svelte';

	let email = $state('');
	let password = $state('');
	let emailError = $state('');
	let passwordError = $state('');
	let loading = $state(false);
	let submitted = $state(false);

	function validate() {
		emailError = email.trim() ? '' : 'Ingresa tu correo electrónico.';
		passwordError = password.trim() ? '' : 'Ingresa tu contraseña.';
		return !emailError && !passwordError;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = false;

		if (!validate()) return;

		loading = true;
		await new Promise((resolve) => setTimeout(resolve, 1200));
		loading = false;
		submitted = true;
	}
</script>

<form class="grid gap-5" novalidate aria-busy={loading} onsubmit={handleSubmit}>
	<TextField
		id="email"
		name="email"
		label="Correo electrónico"
		type="email"
		autocomplete="email"
		placeholder="tú@empresa.com"
		required
		disabled={loading}
		bind:value={email}
		error={emailError}
	/>

	<div class="grid gap-2">
		<TextField
			id="password"
			name="password"
			label="Contraseña"
			type="password"
			autocomplete="current-password"
			placeholder="••••••••"
			required
			disabled={loading}
			bind:value={password}
			error={passwordError}
		/>
		<a
			href="/recuperar"
			class="justify-self-end text-sm font-medium text-brand hover:text-brand-hover hover:underline"
		>
			¿Olvidaste tu contraseña?
		</a>
	</div>

	{#if submitted}
		<Alert tone="success">Sesión simulada. En esta demo no hay autenticación real.</Alert>
	{/if}

	<Button type="submit" {loading} loadingText="Iniciando sesión…">Iniciar sesión</Button>
</form>
