var express = require('express');
var path = require('path');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, '/webApp-plivo/views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
console.log(__dirname);
app.use(express.static(__dirname + '/webApp-plivo/public'));

// set the home page route
app.get('/', function(req, res) {
  // ejs render automatically looks in the views folder
  console.log("entered index")
  // res.render('index');
  res.render('index', {userId: "privateuser2875358196375628740", userName: "Vasanthkumar"});
});

// set the home page route
app.get('/user', function(req, res) {
  // ejs render automatically looks in the views folder
  console.log("entered index")
  // res.render('index');
  res.render('index', {userId: "privateuser2875358196375628740", userName: "Vasanthkumar"});
});

// set the home page route
app.get('/user/:id', function(req, res) {
  // ejs render automatically looks in the views folder
  const userId = req.params.id;
  fetch(`https://letmeknoww.onrender.com/find_user?user_id=${userId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data received")
    console.log(data);
    res.render('index', {userId: data.voip_id, userName: data.name});
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
});

// app.get('/user/:id', customclient.getUserById);

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});