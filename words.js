
var fs = require('fs')
var nonsense = require('./')

var rWord =
  nonsense.words(rs = fs.createReadStream('/usr/share/dict/words'), 4)

module.exports = rWord

if(!module.parent) {

  var i = 0
  var int = setInterval(function() {
    console.log(rWord.random())
    if(i > 500) 
      clearInterval(int)
  }, 100)

}
