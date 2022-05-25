'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RoomSchema = new Schema(
	{
		roomCode: {
			type: String,
			Required: 'Please enter'
		},
		quiz: {
			type: Object,
			Required: 'Please enter'
		},
		users: {
			type: Array,
			Required: 'Please enter'
		},
		currentStatus: {
			type: String,
			Required: 'Please enter'
		},
		currentQuestion: {
			type: Number,
			Required: 'Please enter',
			default: 0
		}
	},
	{
		versionKey: false
	}
)

module.exports = mongoose.model('Rooms', RoomSchema)
