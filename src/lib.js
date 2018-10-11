import { curryN, __, compose, trim, split, head, last } from 'ramda'
import { kebabCase } from 'lodash'
import fs from 'fs-extra'
import request from 'request-promise'
import Count from './Count'
import { tap } from './util'

export const request2 = curryN(2, request)
export const requestBinary = request2(__, { encoding: 'binary' })

export const writeFile3 = curryN(3, fs.writeFile)
export const writeFileBinary = writeFile3(__, __, {
  encoding: 'binary',
  flag: 'w'
})

export const makeMediaNameFactory = ({ path, initialNum, title }) => {
  const count = Count()
  const safeTitle = compose(trim, kebabCase)(title)
  return compose(
    tap(() => count.inc()),
    ext => `${path}/${safeTitle}_${count.value}.${ext}`,
    getUrlExtension
  )
}

export const getUrlExtension = compose(
  trim,
  last,
  split('.'),
  head,
  split(/\#|\?/)
)
