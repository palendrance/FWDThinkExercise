<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<header>
		<nav class="nav border-bottom">
				<RouterLink to="/" class="nav-link">Home</RouterLink>
				<RouterLink to="/tickets" class="nav-link">Tickets</RouterLink>
		</nav>
	</header>

	<main>
		<RouterView/>
	</main>
</template>

<style scoped>
main {
	margin-top: 1rem;
}

@media (min-width: 1024px) {
	main {
		padding: 0 2rem;
	}
}
</style>
