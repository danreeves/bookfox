import path from 'path'
import express from 'express'
import goodreads from './goodreads'
import {
    PRODUCTION,
    GOODREADS_KEY,
    GOODREADS_SECRET,
    CLOUDANT_ACCOUNT,
    CLOUDANT_PASSWORD,
    CLOUDANT_DB,
} from './env'

const app = express()

if (PRODUCTION) {
    app.use('/', express.static(path.join(__dirname, '..', 'build')))
}

app.use('/api', goodreads)

const server = app.listen(process.env.PORT || 4000, function() {
    console.log(`> server started`)
    console.log(`> - port: ${server.address().port}`)
    console.log(`> - mode: ${PRODUCTION ? 'production' : 'development'}`)
    console.log(`> - serving static: ${PRODUCTION ? 'yes' : 'no'}`)
    console.log(
        `> - cloudant keys: ${CLOUDANT_ACCOUNT &&
        CLOUDANT_PASSWORD &&
        CLOUDANT_DB
            ? 'true'
            : 'false'}`
    )
    console.log(
        `> - goodreads keys: ${GOODREADS_KEY && GOODREADS_SECRET
            ? 'true'
            : 'false'}`
    )
})
