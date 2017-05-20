'use strict'

var test = require('tape')
var pull = require('pull-stream')
var limit = require('./')

var byte = Buffer.from([ 0xff ])
var doubleByte = Buffer.from([ 0xff, 0xff ])

test(function(t){
	t.equals(typeof limit, 'function', 'default export is a function')
	t.equals(typeof limit.Error, 'function', 'A .Error is exposed')
	t.end()
})

test('Too much', function(t){
	t.plan(4)

	pull(
		pull.values([ byte, doubleByte ]),
		limit(2),
		pull.collect(function(err, chunks){
			t.ok(err instanceof Error, 'error is instance of Error')
			t.ok(err instanceof limit.Error, 'error is instanceof .Error')
			t.equals(err.message, 'Maximum size reached', 'error message')
			t.deepEquals(chunks, [ byte ])
		})
	)
})

test('Exact', function(t){
	t.plan(2)

	pull(
		pull.values([ doubleByte ]),
		limit(2),
		pull.collect(function(err, chunks){
			t.equals(err, null, 'no error')
			t.deepEquals(chunks, [ doubleByte ])
		})
	)
})

test('Less', function(t){
	t.plan(2)

	pull(
		pull.values([ byte ]),
		limit(2),
		pull.collect(function(err, chunks){
			t.equals(err, null, 'no error')
			t.deepEquals(chunks, [ byte ])
		})
	)
})
