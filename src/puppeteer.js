import * as _ from 'omnibelt'

export const defineVarOnPage = _.curry((page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `)
)
