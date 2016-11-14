var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var https = require('https');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
// var watson = require('watson-developer-cloud');

// https.createServer((req, res) => {
//   console.log('https server created!');
//   if (req.method == 'POST') {
//         console.log("POST");
//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//             console.log("Partial body: " + body);
//         });
//         req.on('end', function () {
//             console.log("Body: " + body);
//         });
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('post received');
//     }
// }).listen(8000, function() {
//   console.log('working...');
// });

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000);

app.post("/", function(req, res) {
  console.log(req.body);
  let response = negSentiment(req.body);
  console.log(response);
  res.send(response);
});

// app.post('/', function(req, res){
//   console.log(req);
//   res.send('success');
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

// https.createServer(app).listen(3000);

const negSentiment = function(tweet) {
  const alchemy_language = new AlchemyLanguageV1({
    api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
  });
  alchemy_language.sentiment(tweet, function(err, response){
    if (err) {
      console.log('error:', err);
    }
    else {
      return response.docSentiment.type;
      // if (response.docSentiment.type === 'negative') {
      //   return 'negative';
      // } else {
      //   return 'positive';
      // }
      // console.log(JSON.stringify(response, null, 2));
    }
  });
};
