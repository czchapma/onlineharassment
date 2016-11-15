var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// var https = require('https');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000);

app.post("/", function(req, res) {
  let alchemy_language = new AlchemyLanguageV1({
    api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
  });
  alchemy_language.sentiment(req.body, function(err, response){
    if (err) {
      console.log('error:', err);
    } else {
      if (response.docSentiment.type === 'negative') {
        res.send(true);
      } else {
        res.send(false);
      }
    };
  });
});

// https.createServer(app).listen(3000);

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
