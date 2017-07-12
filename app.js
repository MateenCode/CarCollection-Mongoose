const express = require("express")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')
const Cars = require('./cars')

app.engine('mustache', mustache())
app.set("view engine", 'mustache')
app.set("views", './views')
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/cars')

var car = new Cars({
  make: 'Lambo',
  model: 'Aventador',
  year: 2017,
  image: 'https://pbs.twimg.com/media/DEB_6GiXoAIFgQs.jpg:large',
  features: {
      color: 'black' ,
      automatic: 'yes'
  }
});

console.log(car);




app.get('/', function(request, respond) {
  Cars.find().sort('year').then(function(cars) {
    respond.render('home-collection', {
      cars: cars
        // features: features
    })
  })
});


app.get('/add-collection', function(request, respond){

  respond.render('add-collection', {

  })
})


app.post('/add', function(request, respond) {

  const car = new Cars()
  car.make = request.body.make
  car.model = request.body.model
  car.year = request.body.year
  car.image = request.body.image

  car.save().then(function(car){

    console.log(car)

respond.redirect('/home-collection')

  }).catch(function(cars) {
    respond.render('home-collection', {
      cars: cars,
    })
     })
  })





app.listen(3000, function() {
  console.log('Express is running!')
})
