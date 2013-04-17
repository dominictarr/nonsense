var fs = require('fs')
var split = require('split')
var nonsense = require('./')
var through = require('through')
var path    = require('path')

var rWord = 
  nonsense.sentences(
    fs.createReadStream(path.join(__dirname, 'example', 'art-of-war.txt'))
    , 2)
  
if(!module.parent) {
  var i = 0
  var int = setInterval(function() {
    console.log(rWord.random().join(' '))
    if(i > 500) 
      clearInterval(int), rs.destroy()
  }, 100)
}
