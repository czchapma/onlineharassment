var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var natural = require('natural');
var verbInflector = new natural.PresentVerbInflector();
var tensify = require('tensify');
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

app.post('/wordvariations/:word', function (req,res){
  var stem = natural.PorterStemmer.stem(req.params.word);
  var singular = verbInflector.singularize(req.params.word);
  var plural = verbInflector.pluralize(req.params.word);
  var past = tensify(req.params.word).past;
  var past_participle = tensify(req.params.word).past_participle;
  var all = [stem, singular, plural, past, past_participle];
  res.send(all);
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post("/", function(req, res) {
  let alchemy_language = new AlchemyLanguageV1({
    api_key: 'ab06f855ca866b658bf8cabdeb152f0c2c74a34b'
  });
  alchemy_language.sentiment(req.body, function(err, response){
    if (err) {
      console.log('error:', req.body);
    } else {
      res.send({
            negative: response.docSentiment.type === 'negative',
            tweet_id: req.body.tweet_id
          });
    };
  });
});
