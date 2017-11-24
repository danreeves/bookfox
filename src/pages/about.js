import React from 'react'
import Page from '../components/page'

export default function About() {
    return (
        <Page>
            <h1>About Bookfox</h1>
            <p>
                Bookfox is an open source application built by{' '}
                <a href="https://danreev.es">Dan Reeves</a>. You can find the
                source code on{' '}
                <a href="https://github.com/danreeves/bookfox">GitHub</a>.
            </p>
            <p>
                Bookfox is built on top of the{' '}
                <a href="https://www.goodreads.com">Goodreads</a> API.
            </p>
        </Page>
    )
}
