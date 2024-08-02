const app = require('./app') // the actual Express app
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})