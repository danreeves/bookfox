import React from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { provideState } from 'freactal'
import Home from './pages/home'

const withAppState = provideState({
    initialState: props => ({
        user: undefined,
        loading: true,
    }),
    effects: {
        initialize: effects => effects.getUser(),
        setLoading: (e, isLoading) => state => ({
            ...state,
            loading: isLoading,
        }),
        setUser: (e, user) => state => ({ ...state, user }),
        getUser: async effects => async () => {
            await effects.setLoading(true)
            const res = await fetch('/api/account', {
                credentials: 'same-origin',
            })
            const { user } = await res.json()
            await effects.setUser(user)
            await effects.setLoading(false)
        },
    },
})

function App() {
    return (
        <div>
            <Route exact path="/" component={Home} />
        </div>
    )
}

const WrappedApp = withRouter(withAppState(App))

function AppWithRouter() {
    return (
        <Router>
            <WrappedApp />
        </Router>
    )
}

export default AppWithRouter
