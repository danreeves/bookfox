import React from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { provideState, injectState, update } from 'freactal'
import { injectGlobal } from 'styled-components'
import Home from './pages/home'
import About from './pages/about'
import Shelf from './pages/shelf'

import Nav from './components/nav'
import Header from './components/header'

injectGlobal`
    *, *:before, *:after {
        font-family: Garamond, Georgia, serif;
        font-weight: 100;
        box-sizing: border-box;
    }
    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
    }
`

const withAppState = provideState({
    initialState: props => ({
        user: undefined,
        loading: true,
        bookshelves: [],
        isNavOpen: false,
    }),
    effects: {
        initialize: async effects => async () => {
            await effects.setLoading(true)
            await Promise.all([effects.getUser(), effects.getBookshelves()])
            await effects.setLoading(false)
        },

        setLoading: update((state, loading) => ({ loading })),
        setUser: update((state, user) => ({ user })),
        setBookshelves: update((state, bookshelves) => ({ bookshelves })),

        getUser: async effects => async () => {
            try {
                const res = await fetch('/api/account', {
                    credentials: 'same-origin',
                })
                const { user } = await res.json()
                await effects.setUser(user)
            } catch (err) {
                // TODO
                // some error handler like a toast or error page
            }
        },

        getBookshelves: async effects => async () => {
            try {
                const res = await fetch('/api/bookshelves', {
                    credentials: 'same-origin',
                })
                const { bookshelves } = await res.json()
                await effects.setBookshelves(bookshelves)
            } catch (err) {
                // TODO
                // some error handler like a toast or error page
            }
        },

        logout: async effects => async () => {
            await effects.setLoading(false)
            try {
                await fetch('/api/logout', {
                    credentials: 'same-origin',
                })
                await effects.setUser(undefined)
            } catch (err) {
                // some error handler
            }
            await effects.setLoading(false)
        },

        toggleNav: update(state => ({
            isNavOpen: !state.isNavOpen,
        })),
    },
})

const App = ({ state, effects }) => (
    <div>
        <Header
            toggleNav={effects.toggleNav}
            user={state.user}
            logout={effects.logout}
        />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/shelf/:shelf" component={Shelf} />
        <Nav
            bookshelves={state.bookshelves}
            open={state.isNavOpen}
            toggleNav={effects.toggleNav}
            logout={effects.logout}
            loggedIn={!!state.user}
        />
    </div>
)

const WrappedApp = withRouter(withAppState(injectState(App)))

const AppWithRouter = () => (
    <Router>
        <WrappedApp />
    </Router>
)

export default AppWithRouter
