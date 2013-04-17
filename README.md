# nonsense

Streams of nonsense in realtime!

Using markov chains on the letters.

## example

``` js
var nonsense = require('nonsense')(4) //matching context

wordStream
  .pipe(nonsense)
```

at anytime, call `nonsense.random()` to get a randomly generated word.
it will seem kinda like the words from the input stream.

word stream should be a stream of single words, with no extra whitespace.

see `example/words.js` for a runnable example.

## Words & Sentences

If you have a text file you want to generate nonsense from,
pass it to `nonsense` like this:

``` js
var rand = nonsense.words(fs.createReadStream(file), 2)

//OR

var rand = nonsense.sentences(fs.createReadStream(file), 2)

//THEN

rand.on('end', function () )
  rand.random()
})
```



## License

MIT
