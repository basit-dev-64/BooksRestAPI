const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./src/routes/index')

const app = express()

const port = process.env.PORT || 5050
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(indexRouter)

app.listen(port, () => {
  console.log('App running on http://localhost:5050')
})

module.exports = app
