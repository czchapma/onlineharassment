var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var https = require('https');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  username: fs.readFileSync('nlu/username'),
  password: fs.readFileSync('nlu/password'),
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

var options = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt'),
    requestCert: false,
    rejectUnauthorized: false,
    passphrase: 'test'
};

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post("/", function(req, res) {
  nlu.analyze({
    'text': req.body.text,
    'features': {
      'sentiment': {},
    }
  }, function(err, response){
    if (err) {
      console.log('error', err);
    } else {
      res.send({
        negative: response.sentiment.document.label === 'negative',
        comment_id: req.body.comment_id,
        username: req.body.username
      })
    }
  })
});
