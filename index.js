var split = require('split')
var through = require('through')

/***
given a stream of words, map to a datastructure that maps a given length of chars
to a next letter, with frequencies.

useful for generating random test data.

{
  abc: {
    d: 1
    '': 4 //< that means the end of the word.
  }

}

**/


function sub(seq, from, to) {
  var f = Array.isArray(seq) ? seq.slice : seq.substring
  return to == null ? f.call(seq, from) : f.call(seq, from, to)
}

function cat(seq, seq2) {
  if(Array.isArray(seq2) || Array.isArray(seq))
    return [].concat(seq).concat(seq2)
  return seq + seq2
}

function get (seq, i) {
  return Array.isArray(seq) ? [seq[i]] : seq[i]
}

function getMap(map, str) {
  return map[Array.isArray(str) ? str.join('|') : str]
}

exports = module.exports = function (len) {
  var map = {}, ts, starts = {}
  var useArray
  function inc (str, c) {
    if(!c) return

    map[str] = map[str] || {}
    map[str][c] = (map[str][c || ''] || 0) + 1
    map[str]['*'] = (map[str]['*'] || 0) + 1
  }

  ts = through(function (word) {
    if(null == useArray) useArray = Array.isArray(word)
    word = cat(cat('^', word), '$')
    var first = true
    while (word.length >= len) {
      var str = sub(word, 0, len)
      var char = get(word, len)
      if(useArray) str = str.join('|')
      if(first) {
        first = false
        starts[str] = (starts[str] || 0) + 1
        starts['*'] = (starts['*'] || 0) + 1
      }
      word = sub(word, 1)
      inc(str, char)
    }
    this.emit('data', word)
  })

  ts.map = map
  ts.starts = starts

  function from(set) {
    var total = set['*']
    var target = ~~(total*Math.random())
    var sum = 0
    for (var i in set) {
      if(i !== '*') {
        sum += set[i]
        if(sum > target) {
          return i
        }
      }
    }

  }

  ts.random = function (max) {
    max = max || Infinity
    do {
      var word = from(ts.starts)
      if(useArray)
        word = word.split('|')
      while(word[word.length - 1] != '$') {
        var last = sub(word, word.length - len)
        word = cat(word, from(getMap(map, last)))
      }
    } while(word.length - 2 >= max);
    return sub(word, 1, word.length - 1)
  }

  return ts
}

exports.words = function (stream, len) {
  return stream
  .pipe(split())
  .pipe(through(function (word) {
    var self = this
    word.split(/\s+/).forEach(function (word) {
      if(/'s$/.test(word)) return
      word = word.trim()
      if(word)
        self.emit('data', word.toLowerCase())
    })
  }))
  .pipe(exports(len))
}

var sentence = /([A-Z][^.]*\.)/

exports.sentences = function (stream, len) {
  return stream
  .pipe(split(sentence))
  .pipe(through(function (words) {
    if(!sentence.test(words)) return
    if(words.length < 30)    return
    words = words.toLowerCase().split(/\s+/).filter(function (e) {
      return !!e
    })
    this.emit('data', words)
  }))
  .pipe(exports(len))
}
