import {
  curry,
  trim,
  toLower,
  defaultTo,
  isNil,
  complement,
  pipe,
  flip,
  contains
} from 'ramda'

export const thenP = success => promise => promise.then(success)

export const promiseAll = x => Promise.all(x)

export const thunkify = curry((fn, value) => () => fn(value))

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const tap = curry(async (fn, x) => {
  await fn(x)
  return x
})

export const equalsAny = flip(contains)

export const stringToBoolean = pipe(
  defaultTo(''),
  toLower,
  trim,
  equalsAny(['true', 't', 'yes', 'y'])
)

export const isNotNil = complement(isNil)

export const sleepT = thunkify(sleep)

export const logT = thunkify(console.log)
