<template>
	<div class="md:fixed md:h-screen w-full flex flex-col md:flex-row">
		<!-- side -->
		<div
			class="w-full md:w-1/5 bg-cover bg-center flex flex-col justify-center text-white text-center py-32 px-6"
			style="
				background-image: url('https://64.media.tumblr.com/680cacdee36f726ad03634f5b000d5e9/075f5f2d439de5de-a5/s540x810/e4be24a78544426c5ae06644dda9a4a4bb16dd20.gifv');
			"
		>
			<router-link to="/host/allquizes" class="hover:text-gray-200">
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
			<div>
				<button
					class="bg-gradient-to-r from-teal-400 hover:bg-blue-400"
					@click="startQuiz"
				>
					<i class="ui play icon"></i>
					Start
				</button>
			</div>
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

			<!-- leaderboard-->
			<div v-if="isStart">
				<h1 class="mb-24">Leaderboard</h1>
				<div class="overflow-x-auto shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left text-gray-500">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th>Rank</th>
								<th><span class="sr-only">Picture</span></th>
								<th>Username</th>
								<th>Score</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(user, index) in sortUserScore"
								:key="user._id"
								class="bg-white border-b hover:bg-gray-50"
							>
								<td class="font-medium text-gray-900 whitespace-nowrap">
									{{ index + 1 }}
								</td>
								<td>
									<img
										:src="user.userpic"
										class="w-16 h-16 object-cover rounded-full mr-16"
										alt="userPic"
									/>
								</td>
								<td>{{ user.username }}</td>
								<td>{{ user.score }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!-- /leaderboard -->
		</div>
		<!-- /content -->
	</div>

	<!-- pop-up  -->
	<div
		class="md:fixed md:h-screen w-full flex flex-col justify-center items-center text-center bg-neutral-900 opacity-90"
		v-if="isEnd"
	>
		<div class="ui segment w-full md:w-3/5 lg:w-2/5">
			<h1 class="text-red-500 my-4">Quiz is over!</h1>
			<h2>Leaderboard</h2>
			<hr />
			<div class="overflow-auto shadow-md sm:rounded-lg my-4">
				<table class="w-full text-sm text-left text-gray-500">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th>Rank</th>
							<th><span class="sr-only">Picture</span></th>
							<th>Username</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(user, index) in sortUserScore"
							:key="user._id"
							class="bg-white border-b hover:bg-gray-50"
						>
							<td class="text-gray-900 whitespace-nowrap">
								{{ index + 1 }}
							</td>
							<td>
								<img
									:src="user.userpic"
									class="w-16 h-16 object-cover rounded-full mr-16"
									alt="userPic"
								/>
							</td>
							<td>{{ user.username }}</td>
							<td>{{ user.score }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<router-link to="/main">
				<button class="ui icon button">
					<i class="home icon"></i>
					Main menu
				</button>
			</router-link>
		</div>
	</div>
	<!-- /pop-up -->
</template>

<script>
import UserCard from '../components/UserCard.vue'
import axios from 'axios'
export default {
	name: 'HostRoom',
	components: {
		UserCard
	},
	data() {
		return {
			isStart: false,
			isEnd: false,
			showTimer: 4000,
			rtInterval: '',
			Room: {
				roomCode: '',
				quiz: {},
				users: [],
				leaderboaed: [],
				currentStatus: ''
			},
			userpic: ''
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
			.then(() => {
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
						})
				}, 200)
			})
			.catch(err => {
				alert('Room not found!')
				this.$router.push({ path: '/main' })
				console.log(err)
			})
	},
	methods: {
		toMenu() {
			clearInterval(this.rtInterval)
			axios.delete(
				`${import.meta.env.VITE_API_BASE_URL}rooms/` + this.Room.roomCode
			)
			this.$router.push({ path: '/main' })
		},
		startQuiz() {
			this.isStart = true
			let newStatus = {
				currentStatus: 'playing'
			}
			axios
				.post(
					`${import.meta.env.VITE_API_BASE_URL}rooms/` + this.Room.roomCode,
					newStatus
				)
				.then(res => {
					console //.log("change Stat");
				})
				.catch(err => {
					console.log('fail')
					console.log(err)
				})
			let totalTime =
				4000 +
				this.Room.quiz.quizTimer * 1000 * this.Room.quiz.quizQuestion.length +
				this.Room.quiz.quizQuestion.length * this.showTimer
			setTimeout(() => {
				this.isEnd = true
				console.log('quiz end')
				clearInterval(this.rtInterval)
				let newStatus = {
					currentStatus: 'ended'
				}
				axios
					.post(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` + this.Room.roomCode,
						newStatus
					)
					.then(res => {
						console //.log("change Stat");
					})
					.catch(err => {
						console.log('fail')
						console.log(err)
					})
			}, totalTime)
		}
	},
	computed: {
		sortUserScore: function () {
			return this.Room.users.sort((a, b) => {
				return a.score > b.score ? -1 : 1
			})
		}
	}
}
</script>

<style lang="postcss" scoped>
th {
	@apply px-6 py-3;
}
td {
	@apply px-6 py-4;
}
</style>
