// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (res, req) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res) {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});


app.get("/api/:date", function(req, res) {
  let dateParam = req.params.date;

  // Check if it's a Unix timestamp (pure number)
  if (/^\d+$/.test(dateParam)) {
    dateParam = parseInt(dateParam); // Convert to number
  }
  
  const date = new Date(dateParam);

  // Handle invalid date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
