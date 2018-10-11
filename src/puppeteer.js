import { curry } from 'ramda'

export const defineVarOnPage = curry((page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `)
)
