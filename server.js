var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var https = require('https');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

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
  let alchemy_language = new AlchemyLanguageV1({
    api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
  });
  alchemy_language.sentiment(req.body, function(err, response){
    if (err) {
      console.log('error:', err);
    } else {
      res.send(response.docSentiment.type === 'negative');
    };
  });
});

// const negSentiment = (text) => {
//
//   let alchemy_language = new AlchemyLanguageV1({
//     api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
//   });
//   alchemy_language.sentiment(text, function(err, response){
//     if (err) {
//       console.log('error:', err);
//     } else {
//       if (response.docSentiment.type === 'negative') {
//         return true;
//       } else {
//         return false;
//       }
//     };
//   });
// };
