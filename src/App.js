import React from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { provideState, update } from 'freactal'
import Home from './pages/home'

const withAppState = provideState({
    initialState: props => ({
        user: undefined,
        loading: true,
    }),
    effects: {
        initialize: effects => effects.getUser(),

        setLoading: update((state, loading) => ({ loading })),

        setUser: update((state, user) => ({ user })),

        getUser: async effects => async () => {
            await effects.setLoading(true)
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
            await effects.setLoading(false)
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
    },
})

const App = () => (
    <div>
        <Route exact path="/" component={Home} />
    </div>
)

const WrappedApp = withRouter(withAppState(App))

const AppWithRouter = () => (
    <Router>
        <WrappedApp />
    </Router>
)

export default AppWithRouter
