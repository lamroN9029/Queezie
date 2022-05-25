<template>
	<div
		class="md:fixed md:h-screen w-full flex flex-col md:flex-row bg-gray-100"
	>
		<!-- side -->
		<div
			class="w-full md:w-1/5 bg-cover bg-center flex flex-col justify-center text-white text-center py-32"
			style="
				background-image: url('https://64.media.tumblr.com/b37ea2b853b45918255fcc904d2fe8d5/tumblr_p7duvi77gt1rnbw6mo1_640.gif');
			"
		>
			<h1 class="mb-12">All Quizes</h1>
			<router-link to="/main" class="hover:text-gray-200">
				<button class="bg-gradient-to-r from-rose-400 hover:bg-rose-800">
					<i class="angle left icon"></i>
					Back
				</button>
			</router-link>
		</div>
		<!-- /side -->
		<!-- content -->
		<div
			class="w-full mt-28 lg:w-4/5 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:overflow-y-auto"
		>
			<Card
				v-for="(quiz, key) in allQuiz"
				:key="quiz._id"
				:_id="quiz._id"
				:quizTitle="quiz.quizTitle"
				:quizDesc="quiz.quizDesc"
				:quizTimer="quiz.quizTimer"
				:quizQuestion="quiz.quizQuestion"
			/>
		</div>
		<!-- /content -->
	</div>
</template>

<script>
import Card from '../components/Card.vue'
import axios from 'axios'
export default {
	name: 'Host',
	components: {
		Card
	},
	data() {
		return {
			allQuiz: [
				{
					quizTitle: '',
					quizDesc: '',
					quizTimer: 10,
					quizQuestion: [
						{
							question: '',
							choice: ['', ''],
							answer: ''
						}
					]
				}
			]
		}
	},
	mounted() {
		axios
			.get(`${import.meta.env.VITE_API_BASE_URL}quizes`)
			.then(res => {
				//console.log(`${import.meta.env.VITE_API_BASE_URL}contacts`)
				this.allQuiz = res.data
				console.log(this.allQuiz)
			})
			.catch(err => {
				console.log(err)
			})
		// setInterval(() => {
		//   axios.get(`${import.meta.env.VITE_API_BASE_URL}quizes`)
		//   .then((res) => {
		//     //console.log(`${import.meta.env.VITE_API_BASE_URL}contacts`)
		//     this.allQuiz = res.data;
		//     console.log(this.allQuiz.length);
		//   })
		//   .catch((err) => {
		//     console.log(err);
		//   });
		// } , 500);
	}
}
</script>

<style></style>
