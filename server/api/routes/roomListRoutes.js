'use strict'
module.exports = function (app) {
	var roomList = require('../controllers/roomListControllers.js')

	app.route('/api/rooms').get(roomList.listAllRooms).post(roomList.createARoom)
	app
		.route('/api/rooms/:roomID')
		.get(roomList.readARoom)
		.delete(roomList.deleteARoom)
		.post(roomList.updateARoom)
		.put(roomList.addPlayer)
		.patch(roomList.updateCurrentQuestion)
	app.route('/api/rooms/:roomID/clean').patch(roomList.cleanAns)
	app
		.route('/api/rooms/:roomID/:userID/:score/:streak')
		.patch(roomList.updateScore)
	app.route('/api/rooms/:roomID/:userID').patch(roomList.updateAnswer)
	app.route('/api/rooms/:roomID/getscore/:userID').get(roomList.getUser)
}
