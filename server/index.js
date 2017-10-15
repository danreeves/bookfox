const path = require('path')
const express = require('express')
const goodreads = require('./goodreads')

const PRODUCTION = process.env.NODE_ENV === 'PRODUCTION'
const app = express()

if (PRODUCTION) {
    app.use('/', express.static(path.join(__dirname, '..', 'build')))
}

app.use('/api', goodreads)

const server = app.listen(4000, function() {
    console.log(`> server started`)
    console.log(`> - port: ${server.address().port}`)
    console.log(`> - mode: ${PRODUCTION ? 'production' : 'development'}`)
    console.log(`> - serving static: ${PRODUCTION ? 'yes' : 'no'}`)
    console.log(`> - goodreads key: ${process.env.GOODREADS_KEY ? 'true': 'false'}`)
    console.log(`> - goodreads secret: ${process.env.GOODREADS_SECRET ? 'true': 'false'}`)
})
