<script lang="ts">
	import AuthShell from '$lib/components/AuthShell.svelte';
	import LoginForm from '$lib/components/LoginForm.svelte';
</script>

<svelte:head>
	<title>Iniciar sesión · HMDPF</title>
</svelte:head>

<AuthShell title="Iniciar sesión" subtitle="Ingresa tus datos para continuar.">
	<LoginForm />

	{#snippet footer()}
		<p>
			¿No tienes una cuenta?
			<a class="font-medium text-brand hover:text-brand-hover hover:underline" href="/registro">
				Crear cuenta
			</a>
		</p>
	{/snippet}
</AuthShell>
