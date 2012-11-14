
var fs = require('fs')
var split = require('split')
var rWord = require('./')(4)
var through = require('through')
var rs

(rs = fs.createReadStream('/usr/share/dict/words'))
  .pipe(split())
  .pipe(through(function (word) {
    if(/'s$/.test(word)) return
    this.emit('data', word.toLowerCase())
  }))
  .pipe(rWord)

module.exports = rWord

if(!module.parent) {

  var i = 0
  var int = setInterval(function() {
    console.log(rWord.random())
    if(i > 500) 
      clearInterval(int), rs.destroy()
  }, 100)

}
