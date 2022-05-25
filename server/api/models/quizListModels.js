'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var QuizSchema = new Schema(
	{
		quizTitle: {
			type: String,
			required: true
		},
		quizDesc: {
			type: String,
			Required: 'Please enter'
		},
		quizTimer: {
			type: Number,
			Required: 'Please enter'
		},
		quizQuestion: {
			type: Array,
			Required: 'Please enter'
		}
	},
	{
		versionKey: false
	}
)

module.exports = mongoose.model('Quizes', QuizSchema)
