import morgan from 'morgan'
import { json } from 'body-parser'
import session from 'express-session'
import methodOverride from 'method-override'
import CloudantStore from 'connect-cloudant-store'
import { PRODUCTION } from '../../env'
import db from '../../db'

const CloudantSession = CloudantStore(session)
const store = new CloudantSession({
    client: db,
    database: 'bookfox',
})

store.cleanupExpired().catch(console.warn.bind(console))
store.on('connect', () => console.log('> session store connected'))
store.on('disconnect', () => console.warn('> session store disconnected'))
store.on('error', error => console.warn('> session store errored:', error))

export default function(routes) {
    routes.use(morgan('tiny'))
    routes.use(json())
    routes.use(methodOverride())
    routes.use(
        session({
            store: store,
            secret: 'keyboard cat',
            name: 'bookfox',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: PRODUCTION,
                maxAge: 5184000000, // 2 months
            },
        })
    )

    return routes
}
