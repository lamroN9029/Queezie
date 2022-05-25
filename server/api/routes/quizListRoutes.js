'use strict'
module.exports = function (app) {
	var quizList = require('../controllers/quizListControllers.js')

	app
		.route('/api/quizes')
		.get(quizList.listAllQuizes)
		.post(quizList.createAQuiz)

	app
		.route('/api/quizes/:quizID')
		.get(quizList.readAQuiz)
		.delete(quizList.deleteAQuiz)
		.post(quizList.updateAQuiz)
}
