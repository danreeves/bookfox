import React from 'react'
import { injectState } from 'freactal'
import { API_URL } from '../lib/config'

function Login() {
    return (
        <div>
            <p>You're not logged in</p>
            <a href={`${API_URL}/oauth/goodreads`}>Authorise with Goodreads</a>
        </div>
    )
}

const Logout = injectState(({ effects }) => (
    <button onClick={effects.logout}>Logout</button>
))

function LoggedIn({ user }) {
    return (
        <div>
            <p>Hi {user.displayName}</p>
            <Logout />
        </div>
    )
}

function Home({ state }) {
    const { user, loading } = state
    return (
        <div>
            <h1>Home</h1>

            {loading !== false ? (
                'Loading...'
            ) : user ? (
                <LoggedIn user={user} />
            ) : (
                <Login />
            )}
        </div>
    )
}

export default injectState(Home)
