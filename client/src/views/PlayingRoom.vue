<template>
	<!-- overlay -->

	<div
		v-if="isBlock"
		class="md:fixed md:h-screen w-full flex flex-col justify-center items-center text-center bg-neutral-900"
	>
		<div class="ui compact segment">
			<h1>Starting in 3 seconds</h1>
		</div>
	</div>

	<div
		v-if="showAnser"
		class="md:fixed md:h-screen w-full flex flex-col justify-center items-center text-center bg-neutral-900"
	>
		<div v-if="showAnserTrue" class="ui fluid inverted green segment">
			<h1>
				<i class="huge check icon"></i>
				Correct!, Answer is
				{{
					Room.quiz.quizQuestion[Room.currentQuestion].choice[
						Room.quiz.quizQuestion[Room.currentQuestion].answer - 1
					]
				}}
			</h1>
		</div>
		<div v-if="showAnserFalse" class="ui fluid inverted red segment">
			<h1>
				<i class="huge close icon"></i>
				Wrong!, Answer is
				{{
					Room.quiz.quizQuestion[Room.currentQuestion].choice[
						Room.quiz.quizQuestion[Room.currentQuestion].answer - 1
					]
				}}
			</h1>
		</div>
	</div>

	<div
		v-if="isEnd"
		class="md:fixed md:h-screen w-full flex flex-col justify-center items-center text-center bg-neutral-900"
	>
		<div class="ui segment w-full md:w-3/5 lg:w-2/5 text-center">
			<h1 class="text-red-500 mb-4">Quiz is over!</h1>
			<h2 class="mb-4">
				{{ getUser(userID).username }} score is
				{{ this.currentUser.score }}
			</h2>
			<router-link to="/main">
				<button class="ui icon button">
					<i class="home icon"></i>
					Main menu
				</button>
			</router-link>
		</div>
	</div>
	<!-- /overlay -->

	<!-- body -->

	<!-- hero -->
	<div
		class="w-full bg-cover bg-center py-28 text-white"
		style="
			background-image: url('https://i.pinimg.com/originals/99/cd/09/99cd0925c516b5d0a740dffd03c3e0df.gif');
		"
	>
		<h1 class="text-center py-8 md:py-0">Queezie Quiz</h1>
		<router-link to="/main" class="hover:text-gray-200">
			<button class="bg-gradient-to-r from-rose-400 hover:bg-rose-800 ml-12">
				<i class="angle left icon"></i>
				Back
			</button>
		</router-link>
	</div>
	<!-- /hero -->

	<!-- content -->
	<div
		class="w-full flex flex-col md:flex-row justify-center items-start bg-gray-100 p-8"
	>
		<!-- col-1 -->
		<div
			class="w-full 2xl:w-1/4 bg-white border rounded-lg shadow-md mx-4 my-2 px-8 py-6"
		>
			<h2>Time: {{ this.Time }}</h2>
			<!-- score -->
			<p>
				{{ getUser(userID).username }} score is
				{{ this.currentUser.score }}
			</p>
			<!-- /score -->
			<!-- leaderboard -->
			<h3 class="text-right mb-4">Leaderboard</h3>
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
			<!-- /leaderboard -->
		</div>

		<!-- /col-1 -->
		<!-- col-2 -->
		<div
			class="w-full 2xl:w-2/4 bg-white border rounded-lg shadow-md mx-4 my-2 p-8 text-center"
		>
			<h1 class="mb-6">
				{{ Room.currentQuestion + 1 }} / {{ Room.quiz.quizQuestion.length }}
			</h1>
			<p class="mb-12">
				{{ Room.quiz.quizQuestion[Room.currentQuestion].question }}
			</p>
			<button
				class="bg-teal-600 hover:bg-teal-700 rounded-md text-white"
				@click="selectOption1"
			>
				{{ Room.quiz.quizQuestion[Room.currentQuestion].choice[0] }}
			</button>

			<button
				class="bg-rose-600 hover:bg-rose-700 rounded-md text-white"
				@click="selectOption2"
			>
				{{ Room.quiz.quizQuestion[Room.currentQuestion].choice[1] }}
			</button>
			<div class="grid grid-cols-2">
				<div class="flex flex-wrap justify-center">
					<UserCard
						v-for="(user, key) in select1_User"
						:key="user._id"
						:username="user.username"
						:userPic="user.userpic"
					/>
				</div>
				<div class="flex flex-wrap justify-center">
					<UserCard
						v-for="(user, key) in select2_User"
						:key="user._id"
						:username="user.username"
						:userPic="user.userpic"
					/>
				</div>
			</div>
		</div>
		<!-- /col-2 -->
	</div>
	<!-- /content -->
</template>

<script>
import UserCard from '../components/UserCard.vue'
import axios from 'axios'
export default {
	name: 'PlayingRoom',
	components: {
		UserCard
	},
	data() {
		return {
			showAnserFalse: false,
			showAnserTrue: false,
			showTimer: 4000,
			isEnd: false,
			isBlock: true,
			stopFlag: '',
			nextInterval: '',
			loadQInterval: '',
			counterInterval: '',
			Time: '',
			select: '',
			showAnser: false,
			userID: this.$route.params.userID,
			Room: {
				roomCode: this.$route.params.roomCode,
				quiz: {
					quizTitle: '',
					quizDesc: '',
					quizTimer: 10,
					quizQuestion: [
						{
							quiestion: '',
							choice: ['', ''],
							answer: ''
						}
					]
				},
				users: [
					{
						userID: '',
						username: '',
						userpic: '',
						score: 0,
						streak: 0,
						currentAnswer: ''
					}
				],
				leaderboard: [],
				currentStatus: '',
				currentQuestion: 0
			},
			score: 0,
			currentUser: {}
		}
	},
	mounted() {
		axios
			.get(
				`${import.meta.env.VITE_API_BASE_URL}rooms/` +
					this.$route.params.roomCode
			)
			.then(res => {
				this.Time = res.data.quiz.quizTimer
				this.Room = res.data
			})
			.then(() => {
				this.loadQInterval = setInterval(() => {
					axios
						.get(
							`${import.meta.env.VITE_API_BASE_URL}rooms/` +
								this.$route.params.roomCode
						)
						.then(res => {
							this.Room = res.data
						})
						.catch(err => {
							console.log(err)
						})
				}, 200)
				this.nextInterval = setInterval(() => {
					this.nextQuestion()
				}, this.showTimer + this.Time * 1000)
				setTimeout(() => {
					this.isBlock = false
					this.counterInterval = setInterval(() => {
						this.startTimer()
					}, 1000)
				}, 3000)
				let totalTime =
					4000 +
					this.Room.quiz.quizTimer * 1000 * this.Room.quiz.quizQuestion.length +
					this.Room.quiz.quizQuestion.length * this.showTimer
				console.log(totalTime)
				setTimeout(() => {
					console.log('quiz end')
					this.isEnd = true
					clearInterval(this.counterInterval)
					clearInterval(this.nextInterval)
					clearInterval(this.loadQInterval)
				}, totalTime)
			})
			.catch(err => {
				// alert("Room not found!");
				// this.$router.push({ path: "/main" });
				console.log(err)
			})
	},
	methods: {
		startTimer() {
			if (this.Time > 0) this.Time -= 1
			if (this.Time == 0) {
				if (this.stopFlag === '' && this.showAnser) {
					this.stopFlag = setTimeout(() => {
						this.Time = this.Room.quiz.quizTimer
						clearTimeout(this.stopFlag)
						this.stopFlag = ''
					}, this.showTimer)
				}
			}
		},
		nextQuestion() {
			this.showAnser = true
			setTimeout(() => {
				this.showAnser = false
				this.showAnserTrue = false
				this.showAnserFalse = false
			}, this.showTimer)
			let curQ = this.Room.currentQuestion
			if (curQ + 1 <= this.Room.quiz.quizQuestion.length) {
				if (this.Room.quiz.quizQuestion.length - curQ != 1) curQ += 1
				//updateScore
				if (
					this.select ===
					this.Room.quiz.quizQuestion[this.Room.currentQuestion].answer
				) {
					console.log('correct')
					this.showAnserTrue = true
					let score = this.currentUser.score
					let streak = this.currentUser.streak
					score += 10 + 1 * streak
					streak += 1
					// console.log(score + " " + streak);
					axios.patch(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` +
							this.Room.roomCode +
							'/' +
							this.userID +
							'/' +
							score +
							'/' +
							streak
					)
				} else {
					this.showAnserFalse = true
					let score = this.currentUser.score
					let streak = 0
					score -= 3
					axios.patch(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` +
							this.Room.roomCode +
							'/' +
							this.userID +
							'/' +
							score +
							'/' +
							streak
					)
				}
				setTimeout(() => {
					let newCurrentQuestion = {
						currentQuestion: curQ
					}
					axios.patch(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` +
							this.$route.params.roomCode,
						newCurrentQuestion
					)
					axios
						.patch(
							`${import.meta.env.VITE_API_BASE_URL}rooms/` +
								this.$route.params.roomCode +
								'/clean'
						)
						.then(() => {
							console.log('clean check')
						})
				}, this.showTimer)
			}
		},
		prevQuestion() {
			if (this.Room.currentQuestion - 1 >= 0) {
				this.Room.currentQuestion -= 1
				let newCurrentQuestion = {
					currentQuestion: this.Room.currentQuestion
				}
				axios.patch(
					`${import.meta.env.VITE_API_BASE_URL}rooms/` +
						this.$route.params.roomCode,
					newCurrentQuestion
				)
				axios
					.patch(
						`${import.meta.env.VITE_API_BASE_URL}rooms/` +
							this.$route.params.roomCode +
							'/clean'
					)
					.then(() => {
						console.log('clean check')
					})
			}
		},
		selectOption1() {
			this.select = '1'
			let newAnswer = {
				currentAnswer: '1'
			}
			axios.patch(
				`${import.meta.env.VITE_API_BASE_URL}rooms/` +
					this.$route.params.roomCode +
					'/' +
					this.$route.params.userID,
				newAnswer
			)
		},
		selectOption2() {
			this.select = '2'
			let newAnswer = {
				currentAnswer: '2'
			}
			axios.patch(
				`${import.meta.env.VITE_API_BASE_URL}rooms/` +
					this.$route.params.roomCode +
					'/' +
					this.$route.params.userID,
				newAnswer
			)
		},
		getUser(userID) {
			// console.log(this.Room.roomCode)
			axios
				.get(
					`${import.meta.env.VITE_API_BASE_URL}rooms/` +
						this.$route.params.roomCode +
						'/getscore/' +
						userID
				)
				.then(res => {
					// console.log(res.data)
					this.currentUser = res.data
					this.select = res.data.currentAnswer
				})
			return this.currentUser
		}
	},
	computed: {
		select1_User: function () {
			return this.Room.users.filter(user => {
				return user.currentAnswer === '1'
			})
		},
		select2_User: function () {
			return this.Room.users.filter(user => {
				return user.currentAnswer === '2'
			})
		},
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
	@apply px-4 py-2;
}
td {
	@apply px-4 py-2;
}
</style>
