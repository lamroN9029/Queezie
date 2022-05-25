<template>
	<div class="font-sans">
		<router-view />
		<Music />
	</div>
</template>

<script>
import Music from './components/Music.vue'

export default {
	name: 'App',
	components: {
		Music
	}
}
</script>

<style></style>
