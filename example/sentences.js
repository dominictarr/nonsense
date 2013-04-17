var fs = require('fs')
var split = require('split')
var rWord = require('../')(2)
var through = require('through')
var path    = require('path')
var rs

var sentence = /([A-Z][^.]*\.)/

;(rs = fs.createReadStream(path.join(__dirname, 'art-of-war.txt')))
  .pipe(split(sentence))
  .pipe(through(function (words) {
    if(!sentence.test(words)) return
    if(words.length < 30)    return
    words = words.toLowerCase().split(/\s+/).filter(function (e) {
      return !!e
    })
    this.emit('data', words)
  }))
  .pipe(rWord)

module.exports = rWord

if(!module.parent) {

  var i = 0
  var int = setInterval(function() {

    console.log(rWord.random().join(' '))
    if(i > 500) 
      clearInterval(int), rs.destroy()
  }, 100)

}
