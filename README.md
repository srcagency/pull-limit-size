# Pull limit size

Throw an error if more than `x` bytes' are consumed.

' Uses `chunk.length` to count so might work with other things than buffers.

```sh
npm install pull-limit-size
```

```js
const limit = require('pull-limit-size')
const { pull, values, log } = require('pull-stream')

pull(
	values([ Buffer.from([ 0xff, 0xff, 0xff ]) ]),
	limit(2),
	log(err => console.log(err))
	// -> { [Error: Maximum size reached] message: 'Maximum size reached' }
)
```
