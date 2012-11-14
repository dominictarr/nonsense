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


var through = require('through')

module.exports = function (len) {
  var map = {}, ts, starts = {}
  function inc (str, c) {
    if(!c) return
    map[str] = map[str] || {}
    map[str][c] = (map[str][c || ''] || 0) + 1
    map[str]['*'] = (map[str]['*'] || 0) + 1
  }

  ts = through(function (word) {
    word = '^'+word+'$'
    var first = true
    while (word.length >= len) {
      var str = word.substring(0, len)
      var char = word[len]
      if(first) {
        first = false
        starts[str] = (starts[str] || 0) + 1
        starts['*'] = (starts['*'] || 0) + 1
        //if(!~starts.indexOf(str))
        //starts.push(str)
      }
        
      word = word.substring(1)
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
        if(sum > target)
          return i
      }
    }

  }

  ts.random = function () {
    var word = from(ts.starts)
    while(word[word.length - 1] != '$') {
      var last = word.substring(word.length - len)
      word += from(map[last])
    }
    return word.substring(1, word.length - 1)
  }
  return ts

}
