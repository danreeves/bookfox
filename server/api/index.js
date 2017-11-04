import express from 'express'
import passport from 'passport'
import isAuthenticated from './middleware/is-authenticated'
import common from './middleware/common'
import goodreads from './middleware/goodreads'
import errorResponse from './lib/error-response'
import { PRODUCTION, GOODREADS_KEY } from '../env'
import Goodreads from '../goodreads'

const gr = Goodreads({
    api_key: GOODREADS_KEY,
})

let routes = express.Router()

routes = common(routes)
routes = goodreads(routes)

routes.get('/', function(req, res) {
    res.send({ error: 'sorry - not an endpoint' })
})

routes.get('/account', isAuthenticated, function(req, res) {
    const { id, displayName } = req.user.profile
    res.send({ user: { id, displayName } })
})

routes.get('/bookshelves', isAuthenticated, async function(req, res) {
    try {
        const response = await gr.bookshelves({ user_id: req.user.id })
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(errorResponse(err))
    }
})

routes.get('/bookshelf/:shelf', isAuthenticated, async function(req, res) {
    const { shelf } = req.params
    const { token, tokenSecret } = req.user
    try {
        const response = await gr.bookshelf(
            { shelf },
            { token, tokenSecret }
        )
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(errorResponse(err))
    }
})

routes.get('/logout', function(req, res) {
    try {
        req.logout()
        res
            .clearCookie('bookfox')
            .status(200)
            .send({ success: true, error: null })
    } catch (error) {
        res
            .clearCookie('bookfox')
            .status(500)
            .send({ success: true, error: error })
    }
})

export default routes
