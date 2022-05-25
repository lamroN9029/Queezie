var express = require('express')
app = express()

port = process.env.PORT || 5000

mongoose = require('mongoose')

Quiz = require('./api/models/quizListModels.js')

Room = require('./api/models/roomListModels.js')

bodyParser = require('body-parser')

const url =
	'mongodb+srv://asuyama:asuyama123@cluster.a8rk8.mongodb.net/QuizDB?retryWrites=true&w=majority'

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/QuizDB', function(error){
//     if(error) throw error
//     console.log('Successfully connected');
// })
mongoose.connect(url, function (error) {
	if (error) throw error
	console.log('Successfully connected')
})

const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var routesQuiz = require('./api/routes/quizListRoutes.js')
routesQuiz(app)

var routesRoom = require('./api/routes/roomListRoutes.js')
routesRoom(app)

app.listen(port)

console.log('Server started on : ' + port)
