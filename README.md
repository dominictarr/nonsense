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

## License

MIT
