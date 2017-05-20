'use strict'

function SizeLimitError(m){ this.message = m }

SizeLimitError.prototype = Object.create(Error.prototype)

limit.Error = SizeLimitError

module.exports = limit

function limit(max) {
	return function(read) {
		return function(end, cb) {
			return read(end, function(end, data) {
				if (end !== null) return cb(end)

				max -= data.length

				if (max >= 0) return cb(null, data)

				cb(new SizeLimitError('Maximum size reached'))
			})
		}
	}
}
