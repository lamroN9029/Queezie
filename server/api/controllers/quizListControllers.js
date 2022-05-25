'use strict'
var mongoose = require('mongoose')
Quiz = mongoose.model('Quizes')

exports.listAllQuizes = function (req, res) {
	var query = { sort: { quizID: 1 } }
	Quiz.find({}, null, query, function (err, quiz) {
		if (err) throw err
		console.log(quiz)
		res.json(quiz)
	})
}

exports.createAQuiz = function (req, res) {
	var newQuiz = new Quiz(req.body)
	console.log(req.body)
	newQuiz.save(function (err, quiz) {
		if (err) throw err
		res.json(quiz)
	})
}

exports.readAQuiz = function (req, res) {
	//console.log(req.params.quizID)
	Quiz.findById(req.params.quizID, function (err, quiz) {
		if (err) throw err
		res.json(quiz)
	})
}

exports.deleteAQuiz = function (req, res) {
	//console.log(req.params.quizID)
	Quiz.findByIdAndRemove(req.params.quizID, function (err, quiz) {
		if (err) throw err
		const response = {
			message: 'Delete quiz id: ' + req.params.quizID + ' successfully',
			id: quiz._id
		}
		res.json(response)
	})
}

exports.updateAQuiz = function (req, res) {
	console.log(req.params.quizID)
	var newQuiz = {}
	newQuiz = req.body
	console.log(newQuiz)
	Quiz.findByIdAndUpdate(
		req.params.quizID,
		newQuiz,
		{ new: true },
		function (err, quiz) {
			if (err) throw err
			console.log(quiz)
			res.json(quiz)
		}
	)
}
