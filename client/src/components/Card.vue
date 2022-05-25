<template>
	<div class="border rounded-lg h-36 lg:h-52 m-4 p-4 bg-white shadow-md">
		<p class="truncate">{{ quizTitle }}</p>
		<hr />
		<p class="h-12 lg:h-28 text-gray-400 overflow-y-auto">
			{{ quizDesc }}
		</p>
		<button class="float-right ui inverted blue button" @click="hostQuiz">
			Host
		</button>
	</div>
</template>

<script>
import axios from 'axios'
function dec2hex(dec) {
	return dec.toString(16).padStart(2, '0')
}
function generateId(len) {
	var arr = new Uint8Array((len || 40) / 2)
	window.crypto.getRandomValues(arr)
	return Array.from(arr, dec2hex).join('')
}
export default {
	name: 'Card',
	props: {
		_id: {
			type: String,
			require: true
		},
		quizTitle: {
			type: String,
			require: true
		},
		quizDesc: {
			type: String,
			require: true
		},
		quizTimer: {
			type: Number,
			require: true
		},
		quizQuestion: {
			type: Object,
			require: true
		}
	},
	methods: {
		hostQuiz() {
			let newRoom = {
				roomCode: generateId(6),
				quiz: {
					quizTitle: this.quizTitle,
					quizDesc: this.quizDesc,
					quizTimer: this.quizTimer,
					quizQuestion: this.quizQuestion
				},
				users: [],
				leaderboard: [],
				currentStatus: 'waiting',
				currentQuestion: 0
			}
			axios
				.post(`${import.meta.env.VITE_API_BASE_URL}rooms`, newRoom)
				.then(res => {
					console.log(res)
				})
				.then(() => {
					this.$router.push({ path: '/host/room/' + newRoom.roomCode })
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style>
/* .max-lines {
	display: block;
	text-overflow: ellipsis;
	word-wrap: break-word;
	overflow: hidden;
	max-height: 3.6em;
	line-height: 1.8em;
} */
</style>
