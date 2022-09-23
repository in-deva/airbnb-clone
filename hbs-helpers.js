const hbs = require('hbs')

hbs.registerHelper('ifEq', (arg1, arg2, options) => {
  return String(arg1) == String(arg2) ? options.fn(this) : options.inverse(this)
})

module.exports = hbs
// export as object if more helpers required
