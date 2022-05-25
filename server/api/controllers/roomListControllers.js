'use strict'
var mongoose = require('mongoose')
Room = mongoose.model('Rooms')

exports.listAllRooms = function (req, res) {
	Room.find({}, null, function (err, room) {
		if (err) throw err
		console.log(room)
		res.json(room)
	})
}

exports.createARoom = function (req, res) {
	var newRoom = new Room(req.body)
	console.log(req.body)
	newRoom.save(function (err, room) {
		if (err) throw err
		res.json(room)
	})
}

exports.readARoom = function (req, res) {
	//console.log(req.params.roomID)
	Room.findOne({ roomCode: req.params.roomID }, function (err, room) {
		if (err) {
			console.log('not found')
			throw err
		}
		// else{
		//     // console.log("found")
		// }
		res.json(room)
	})
}

exports.deleteARoom = function (req, res) {
	//console.log(req.params.roomID)
	Room.findOneAndRemove({ roomCode: req.params.roomID }, function (err, room) {
		if (err) throw err
		const response = {
			message: 'Delete quiz id: ' + req.params.roomID + ' successfully',
			id: room._id
		}
		res.json(response)
	})
}

exports.updateARoom = function (req, res) {
	console.log(req.params.roomID)
	var newRoom = {}
	newRoom = req.body
	console.log(newRoom)
	Room.findOneAndUpdate(
		{ roomCode: req.params.roomID },
		newRoom,
		{ new: true },
		function (err, room) {
			if (err) throw err
			console.log(room)
			res.json(room)
		}
	)
}

exports.addPlayer = function (req, res) {
	var newPlayer = {}
	newPlayer = req.body
	console.log(newPlayer)
	Room.findOneAndUpdate(
		{ roomCode: req.params.roomID },
		{ $push: { users: newPlayer } },
		function (err, room) {
			if (err) throw err
			console.log(room)
			res.json(room)
		}
	)
}

exports.updateScore = function (req, res) {
	// var newPlayer = {}
	// newPlayer = req.body
	// console.log(newPlayer)
	Room.updateOne(
		{ roomCode: req.params.roomID, 'users.id': req.params.userID },
		{
			$set: {
				'users.$.score': parseInt(req.params.score),
				'users.$.streak': parseInt(req.params.streak)
			}
		},
		function (err, room) {
			if (err) throw err
			console.log(room)
			res.json(room)
		}
	)
}

exports.updateAnswer = function (req, res) {
	var newAnswer = {}
	console.log(req.body)
	newAnswer = req.body.currentAnswer
	console.log(newAnswer)
	Room.updateOne(
		{ roomCode: req.params.roomID, 'users.id': req.params.userID },
		{ $set: { 'users.$.currentAnswer': newAnswer } },
		function (err, room) {
			if (err) throw err
			console.log(room)
			res.json(room)
		}
	)
}

exports.updateCurrentQuestion = function (req, res) {
	var newCurQuestion = {}
	//console.log(req.body)
	newCurQuestion = req.body.currentQuestion
	//console.log(newCurQuestion)
	Room.updateOne(
		{ roomCode: req.params.roomID },
		{ $set: { currentQuestion: parseInt(newCurQuestion) } },
		function (err, room) {
			if (err) throw err
			//console.log(room)
			res.json(room)
		}
	)
}

exports.cleanAns = function (req, res) {
	var blankAns = ''
	console.log('Clear answer')
	// Room.updateMany({"roomCode":"03b1c6"},{$set:{"users.$[elem].currentAnswer":blankAns}},{ arrayFilters: [{"elem.currentAnswer":{$ne:""}}]})
	Room.findOneAndUpdate(
		{ roomCode: req.params.roomID },
		{ $set: { 'users.$[elem].currentAnswer': blankAns } },
		{ arrayFilters: [{ 'elem.currentAnswer': { $ne: '' } }] },
		function (err, room) {
			if (err) throw err
			// console.log(room)
			res.json(room)
		}
	)
}

exports.getUser = function (req, res) {
	Room.findOne(
		{ roomCode: req.params.roomID },
		{ users: { $elemMatch: { id: req.params.userID } } },
		function (err, room) {
			if (err) {
				throw err
			}
			res.json(room.users[0])
		}
	)
}
