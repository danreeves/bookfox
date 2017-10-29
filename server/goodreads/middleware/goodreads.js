import passport from 'passport'
import { Strategy as GoodreadsStrategy } from 'passport-goodreads'
import { GOODREADS_KEY, GOODREADS_SECRET } from '../../env'

export default function(routes) {
    // Initialise passport
    passport.serializeUser(function(user, done) {
        const { id, displayName } = user
        done(null, { id, displayName })
    })
    passport.deserializeUser(function(obj, done) {
        done(null, obj)
    })
    passport.use(
        new GoodreadsStrategy(
            {
                consumerKey: GOODREADS_KEY,
                consumerSecret: GOODREADS_SECRET,
                callbackURL: 'http://localhost:4000/api/oauth/callback',
            },
            function(token, tokenSecret, profile, done) {
                console.log({ token, tokenSecret, profile })
                return done(null, profile)
            }
        )
    )

    // set up middleware
    routes.use(passport.initialize())
    routes.use(passport.session())

    routes.get('/oauth/goodreads', passport.authenticate('goodreads'), () => {})

    routes.get(
        '/oauth/callback',
        passport.authenticate('goodreads', {
            failureRedirect: '/api/oauth/goodreads',
        }),
        (req, res) => {
            res.redirect('http://localhost:3000/')
        }
    )

    return routes
}
