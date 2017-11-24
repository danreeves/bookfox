import React from 'react'
import { injectState } from 'freactal'
import Page from '../components/page'
import Shelf from './shelf'
import { API_URL } from '../lib/config'

function Login() {
    return (
        <Page>
            <p>You're not logged in.</p>
            <p>
                We need permission to see what books you're reading and move
                them to shelves for you.
            </p>
            <a href={`${API_URL}/oauth/goodreads`}>Authorise with Goodreads</a>
        </Page>
    )
}

function Home({ state, effects }) {
    const { user } = state
    return user ? <Shelf slug="currently-reading" /> : <Login />
}

export default injectState(Home)
