import React from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { provideState } from 'freactal'
import qs from 'qs'
import Home from './pages/home'

const withAppState = provideState({
    initialState: props => ({ oauth_token: null, authorize: '0' }),
    effects: {
        initialize: (effects, props) => oldState => {
            const querystring = qs.parse(
                props.location.search.replace(/^\?/, '')
            )
            return {
                ...oldState,
                oauth_token:
                    'oauth_token' in querystring
                        ? querystring.oauth_token
                        : null,
                authorize:
                    'authorize' in querystring ? querystring.authorize : null,
            }
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

function RouterWrapper() {
    return (
        <Router>
            <WrappedApp />
        </Router>
    )
}

export default RouterWrapper
