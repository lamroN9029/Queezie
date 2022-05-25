<template>
	<!-- hero -->
	<div
		class="w-full bg-center bg-cover py-28 text-white"
		style="
			background-image: url('https://i.pinimg.com/originals/99/cd/09/99cd0925c516b5d0a740dffd03c3e0df.gif');
		"
	>
		<h1 class="text-center">Create Quiz</h1>
		<router-link to="/main" class="hover:text-gray-200">
			<button class="bg-gradient-to-r from-rose-400 hover:bg-rose-800 ml-12">
				<i class="angle left icon"></i>
				Back
			</button>
		</router-link>
	</div>
	<!-- /hero -->

	<!-- content -->
	<div class="w-full bg-gray-100 p-8">
		<!-- form -->
		<fieldset
			class="w-full md:w-1/2 lg:w-2/5 mx-auto bg-white border rounded-lg shadow-xl mb-6 p-8"
		>
			<legend class="pb-2 text-right">
				<h2>Create your own quiz</h2>
			</legend>
			<p class="mb-12"><span class="text-red-400">*</span> Required</p>
			<form @submit.prevent="submitQuiz()">
				<label>Quiz title <span class="text-red-400">*</span></label>
				<input
					type="text"
					placeholder="title"
					v-model="Quiz.quizTitle"
					required
					autofocus
				/>

				<label>Quiz description</label>
				<textarea
					type="text"
					rows="4"
					placeholder="description"
					v-model="Quiz.quizDesc"
				/>

				<label>Time per question</label>

				<input type="number" min="1" v-model="Quiz.quizTimer" />

				<label
					>Number of question
					<span v-if="Quiz.quizNumber > 100" class="text-red-400">
						(Quiz can't have more than 100 question)
					</span>
				</label>

				<input
					type="number"
					min="1"
					max="100"
					v-model="Quiz.quizNumber"
					@change="updateQuizQuestion()"
				/>

				<!-- questions -->
				<fieldset
					v-for="(question, index) in Quiz.quizQuestion"
					class="border mx-2 my-6 p-4"
				>
					<legend>Question {{ index + 1 }}</legend>
					<label>Question: </label>
					<textarea placeholder="question" v-model="question.question" />

					<label>Option 1:</label>
					<textarea
						rows="1"
						placeholder="option 1"
						v-model="question.choice[0]"
					/>

					<label> Option 2: </label>
					<textarea
						rows="1"
						placeholder="option 2"
						v-model="question.choice[1]"
					/>

					<div>
						<label>Correct option: </label>
						<input type="radio" v-model="question.answer" value="1" />
						<label>Option 1</label>
						<input type="radio" v-model="question.answer" value="2" />
						<label>Option 2</label>
					</div>
				</fieldset>
				<!-- /questions -->

				<button
					type="submit"
					class="block bg-sky-600 hover:bg-sky-700 rounded-md text-white mx-auto"
				>
					<i class="check icon"></i>
					Submit
				</button>
			</form>
		</fieldset>
		<!-- /form -->
	</div>
	<!-- /content -->
</template>

<script>
import axios from 'axios'
export default {
	name: 'CreateQuiz',
	data() {
		return {
			modalActive: true,
			Quiz: {
				quizTitle: '',
				quizDesc: '',
				quizTimer: 10,
				quizNumber: 1,
				quizQuestion: [
					{
						question: '',
						choice: ['', ''],
						answer: '1'
					}
				]
			}
		}
	},
	methods: {
		updateQuizQuestion() {
			this.Quiz.quizQuestion = []
			for (let i = 0; i < this.Quiz.quizNumber; i++) {
				this.Quiz.quizQuestion.push({
					question: '',
					choice: ['', ''],
					answer: '1'
				})
			}
		},
		submitQuiz() {
			//   var randomID = generateId(6);
			//   this.Quiz.quizID = randomID;
			//   console.log(randomID);
			axios
				.post(`${import.meta.env.VITE_API_BASE_URL}quizes`, this.Quiz)
				.then(res => {
					console.log(res)
					alert('Success!')
					this.$router.push({ path: '/main' })
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="postcss" scoped>
input[type='text'],
input[type='number'],
textarea {
	@apply w-full border rounded-sm my-3 px-2 py-1;
}
input[type='radio'] {
	@apply mx-2 mb-0.5;
}
</style>
