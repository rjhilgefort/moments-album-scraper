import * as _ from 'omnibelt'
import fs from 'fs-extra'
import request from 'request-promise'

export const request2 = _.curryN(2, request)
export const requestBinary = request2(_.__, { encoding: 'binary' })

export const writeFile3 = _.curryN(3, fs.writeFile)
export const writeFileBinary = writeFile3(_.__, _.__, {
  encoding: 'binary',
  flag: 'w'
})

export const thenP = success => promise => promise.then(success)
export const promiseAll = x => Promise.all(x)

export const sleepT = _.thunkify(_.sleep)
export const logT = _.thunkify(console.log)
