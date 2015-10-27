var express = require('express');
var app = express();

var rowShort = [
  'Row, row, row your boat,',
  'Gently down the stream.',
  'Merrily, merrily, merrily, merrily,',
  'Life is but a dream.'
];

var rowLong = {
  nth: 'Row, row, row your boat,',
  t9899: 'Gently down the stream.',
  thorcg: 'If you see an alligator,',
  qqq: 'Don\'t forget to scream.',
  mbth: 'Row, row, row your boat,',
  t332: 'Gently down the stream.',
  n000001: 'Throw your teacher overboard',
  eueueu22222: 'And listen to her scream.',
  idoet3434: 'Row, row, row your boat,',
  b: 'Gently down the stream.',
  cccccc: 'Ha ha, fooled ya,',
  d454: 'I\'m a submarine.'
};

function nextVerse(poem, basePath, startKey) {
  var keys = Object.keys(poem);

  if (typeof startKey === 'undefined') {
    return basePath + '/' + keys[0];
  }

  var next = keys[keys.indexOf(startKey) + 1];

  if (!next) {
    return null;
  }

  return basePath + '/' + next;
}

function randomDelay(fn) {
  setTimeout(fn, (Math.random() * 5000) + 500);
}


app.use('/poem/row/:part', function (req, res) {
  var verse = rowShort[req.params.part];

  if (!verse) {
    randomDelay(res.end.bind(res, 'ERROR: parameter out of range'));
  } else {
    randomDelay(res.end.bind(res, verse));
  }
});

app.use('/poem/row-long/:part', function (req, res) {
  var part = req.params.part;
  var next = nextVerse(rowLong, '/poem/row-long', part);
  var more = (next !== null);

  randomDelay(res.json.bind(res, {
    next: next,
    verse: rowLong[part],
    more: more
  }));
});

app.use('/poem/row-long', function (req, res) {
  var next = nextVerse(rowLong, '/poem/row-long');
  randomDelay(res.json.bind(res, { next: next, more: true }));
});

app.listen(3200);
console.log('Listening on port 3200...');
