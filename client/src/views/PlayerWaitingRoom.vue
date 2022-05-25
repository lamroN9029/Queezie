<template>
	<!-- HostRoom (but rounter-link to Main, no Start button & no leaderboard) -->
	<div class="md:fixed md:h-screen w-full flex flex-col md:flex-row">
		<!-- side -->
		<div
			class="w-full md:w-1/5 bg-cover bg-center flex flex-col justify-center text-white text-center py-32 px-6"
			style="
				background-image: url('https://64.media.tumblr.com/680cacdee36f726ad03634f5b000d5e9/075f5f2d439de5de-a5/s540x810/e4be24a78544426c5ae06644dda9a4a4bb16dd20.gifv');
			"
		>
			<router-link to="/" class="hover:text-gray-200">
				<button class="bg-gradient-to-r from-rose-400 hover:bg-blue-400 mb-20">
					<i class="angle left icon"></i>
					Back
				</button>
			</router-link>

			<h2 class="mb-12">Room Code: {{ Room.roomCode }}</h2>
			<h3 class="text-right mb-4 underline decoration-1">
				{{ Room.quiz.quizTitle }}
			</h3>

			<p class="text-right mb-4">{{ Room.quiz.quizDesc }}</p>
			<div class="ui divider"></div>
			<p class="text-left mb-12">Participant: {{ Room.users.length }} people</p>
		</div>
		<!-- /side -->
		<!-- content -->
		<div class="w-full md:mt-0 md:w-4/5 md:overflow-y-auto px-16 py-8">
			<!-- all parti -->
			<div v-if="!isStart">
				<h1 class="mb-24">All Participant</h1>
				<hr />
				<div v-if="!isStart" class="flex flex-wrap justify-center">
					<UserCard
						v-for="(user, key) in Room.users"
						:key="user._id"
						:username="user.username"
						:userPic="user.userpic"
					/>
				</div>
			</div>
			<!-- /all parti -->
		</div>
		<!-- /content -->
	</div>
	<!-- /HostRoom (but rounter-link to Main, no Start button & no leaderboard) -->

	<!-- overlay -->
	<div
		v-if="toggleAdd"
		class="md:fixed md:h-screen w-full flex flex-col justify-center items-center text-center bg-neutral-900 opacity-90"
	>
		<div class="ui segment w-full md:w-2/3 lg:w-1/3">
			<div class="ui fluid left icon input mx-4">
				<input type="text" placeholder="Username" v-model="username" />
				<i class="users icon"></i>
			</div>
			<div class="ui fluid left icon input mx-4 mb-4">
				<input
					type="text"
					placeholder="Picture Link (Can be empty)"
					v-model="userpic"
				/>
				<i class="file image icon"></i>
			</div>
			<button class="ui green button" @click="addUser">Join</button>
		</div>
	</div>
	<!-- /overlay -->
</template>

<script>
import UserCard from '../components/UserCard.vue'
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
	name: 'PlayerWaitingRoom',
	components: {
		UserCard
	},
	data() {
		return {
			rtInterval: '',
			toggleAdd: true,
			username: '',
			userpic: '',
			userID: '',
			Room: {
				roomCode: '',
				quiz: {},
				users: [],
				leaderboaed: [],
				currentStatus: ''
			}
		}
	},
	mounted() {
		axios
			.get(
				`${import.meta.env.VITE_API_BASE_URL}rooms/` +
					this.$route.params.roomCode
			)
			.then(res => {
				//console.log(`${import.meta.env.VITE_API_BASE_URL}contacts`)\
				this.Room.roomCode = this.$route.params.roomCode
				this.Room.quiz = res.data.quiz
				this.Room.users = res.data.users
				this.Room.currentStatus = 'waiting'
				// console.log(res.data.quiz);
			})
			.catch(err => {
				alert('Room not found!')
				this.$router.push({ path: '/main' })
				console.log(err)
			})
		this.rtInterval = setInterval(() => {
			axios
				.get(
					`${import.meta.env.VITE_API_BASE_URL}rooms/` +
						this.$route.params.roomCode
				)
				.then(res => {
					//console.log(`${import.meta.env.VITE_API_BASE_URL}contacts`)\
					this.Room.roomCode = this.$route.params.roomCode
					this.Room.quiz = res.data.quiz
					this.Room.users = res.data.users
					this.Room.currentStatus = res.data.currentStatus
					if (this.Room.currentStatus === 'playing') {
						clearInterval(this.rtInterval)
						// console.log(
						//   "/playing/room/" + this.Room.roomCode + "/" + this.userID
						// );
						this.$router.push({
							path: '/playing/room/' + this.Room.roomCode + '/' + this.userID
						})
					}
				})
		}, 200)
	},
	methods: {
		toMenu() {
			clearInterval(this.rtInterval)
			this.$router.push({ path: '/main' })
		},
		addUser() {
			if (this.username === '') {
				alert('Please enter Username')
			} else {
				if (this.userpic === '') {
					this.userpic =
						'https://fomantic-ui.com/images/avatar2/large/elyse.png'
				}
				let newUser = {
					id: generateId(10),
					username: this.username,
					userpic: this.userpic,
					score: 0,
					streak: 0,
					currentAnswer: ''
				}
				this.userID = newUser.id
				this.Room.users.push(newUser)
				let updateUser = {
					users: this.Room.users
				}
				axios
					.put(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` + this.Room.roomCode,
						newUser
					)
					.then(res => {
						console.log(res.data)
					})
					.catch(err => {
						console.log(err)
					})
				this.toggleAdd = false
			}
		}
	}
}
</script>

<style></style>
