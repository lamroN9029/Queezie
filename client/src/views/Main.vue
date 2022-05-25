<template>
	<div
		class="w-screen h-screen bg-center bg-cover flex flex-col justify-center text-center text-white"
		style="
			background-image: url(https://images.squarespace-cdn.com/content/v1/580fa9f7e58c62cb7501937b/1496358009519-3OOP60SU1L9CWOXN544R/bedroom.gif);
		"
	>
		<h1 class="text-5xl md:text-6xl tracking-widest leading-tight mb-24">
			Queezie
		</h1>
		<!-- Join Quiz  -->
		<h2 class="mb-6">
			<i class="play icon"></i>
			Join Quiz
		</h2>
		<div class="mb-12">
			<input
				class="text-black border px-2 md:px-8 py-4"
				placeholder="Room Code . . . "
				maxlength="6"
				v-model="roomCode"
			/>
			<button
				@click="joinRoom"
				class="bg-gradient-to-r from-teal-400 px-6 md:px-12 hover:bg-teal-800"
			>
				Join Room
			</button>
		</div>
		<!-- /Join Quiz  -->

		<!-- Host Room | Create Quiz -->
		<h2 class="mb-6">Host Room | Create Quiz</h2>

		<div class="text-sm md:text-base">
			<router-link to="/host/allquizes">
				<button class="bg-gradient-to-r from-sky-400 hover:bg-sky-800">
					<i class="home icon"></i>
					Host
				</button>
			</router-link>
			<router-link to="/create">
				<button class="bg-gradient-to-r from-emerald-400 hover:bg-emerald-800">
					<i class="plus circle icon"></i>
					Create
				</button>
			</router-link>
		</div>
		<!-- /Host Room | Create Quiz -->
	</div>
</template>

<script>
import Music from '../components/Music.vue'
import axios from 'axios'

export default {
	name: 'Main',
	components: {
		Music
	},
	data() {
		return {
			roomCode: ''
		}
	},
	methods: {
		joinRoom() {
			axios
				.get(`${import.meta.env.VITE_API_BASE_URL}rooms/` + this.roomCode)
				.then(res => {
					if (res.data) {
						if (res.data.currentStatus === 'waiting') {
							this.$router.push({ path: '/waiting/room/' + this.roomCode })
						} else alert('Room not found')
					} else {
						alert('Room not found')
						location.reload()
					}
				})
				.catch(err => {
					alert('Room not found')
					console.log(err)
				})
		}
	}
}
</script>

<style lang="postcss" scoped>
button {
	@apply border px-4 md:px-8 py-4 hover:text-gray-200;
}
</style>
