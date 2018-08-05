import * as _ from 'omnibelt'
import Count from './Count'

export const makeMediaNameFactory = ({ path, initialNum, title }) => {
  const count = Count()
  const safeTitle = _.compose(_.trim, _.kebabCase)(title)
  return _.compose(
    _.tap(() => count.inc()),
    ext => `${path}/${safeTitle}_${count.value}.${ext}`,
    getUrlExtension
  )
}

export const getUrlExtension = _.compose(
  _.trim,
  _.last,
  _.split('.'),
  _.head,
  _.split(/\#|\?/)
)
