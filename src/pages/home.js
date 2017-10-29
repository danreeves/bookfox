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

function LoggedIn() {
    return <p>You're logged in!</p>
}

function Home({ state }) {
    const { oauth_token, authorize } = state
    const notAuthed = authorize !== '1' || !oauth_token
    return (
        <div>
            <h1>Home</h1>
            {notAuthed ? <Login /> : <LoggedIn />}
        </div>
    )
}

export default injectState(Home)
