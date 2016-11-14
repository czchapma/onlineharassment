var express = require('express');
var app = express();
var https = require('https');
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

//
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

app.post('/', function(req, res){
  console.log(req);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// https.createServer(app).listen(3000);

const negSentiment = function(req) {
  const alchemy_language = new AlchemyLanguageV1({
    api_key: 'ca337bd9260cbf967aa5faa2fdd5c9ddbd7eae23'
  });
  alchemy_language.sentiment(req, function(err, response){
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
  });
};
