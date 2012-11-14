
var rword = require('..')(2)
var split = require('split')
var names = require('random-name/names.json')
//var fs    = require('fs')

//fs.createReadStream('/usr/share/dict/words')
//.pipe(split())
names.forEach(function (n) {
  rword.write(n)
})
//rword.write('hello')
//rword.write('goodbye')
//rword.write('whatever')

console.log(rword.random())

