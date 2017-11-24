import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { isArray } from 'lodash'
import { API_URL } from '../lib/config'
import titlify from '../lib/titlify'

const NavWrapper = styled.div`
    position: fixed;
    display: flex;
    height: 100%;
    top: 0;
    left: 0;
    width: ${props => (props.open ? '100%' : '0')};
    z-index: 9999999999999;
`
const Nav = styled.nav`
    background: #fff;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    border-right: 1px solid #ddd;
    background: #fff;
    flex: 1 1 33vw;
    display: flex;
    flex-direction: column;
    transition: transform 0.1s ease-out;
    transform: ${props =>
        props.open ? 'translateX(0%)' : 'translateX(-100%)'};
`

const NavOverlay = styled.div`
    flex: 1 1 auto;
    background: #333;
    transition: opacity 0.5s ease-out;
    opacity: ${props => (props.open ? '0.075' : '0.0')};
`

const loadingAnimation = keyframes`
    to {
        width: 1.2em;
    }
`

const NavLoading = styled.div.attrs({
    children: 'Loading',
})`
    background: #eee;
    color: #333;
    padding-left: 1rem;
    width: 100%;
    border-radius: 4px;
    min-height: 44px;
    line-height: 44px;
    &:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        animation: ${loadingAnimation} steps(4, end) 900ms infinite;
        content: '\\2026'; /* ascii code for the ellipsis character */
        width: 0px;
    }
`

const NavTitle = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 2rem;
    color: #444;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
`

const NavHeading = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1.35rem;
    color: #444;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.75rem;
`

const linkStyles = `
    display: inline-block;
    border: 1px solid #eee;
    padding-left: 1rem;
    margin: 2.5px;
    border-radius: 4px;
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
    text-decoration: none;
    color: #000;
    min-height: 44px;
    line-height: 44px;
    &:hover,
    &:focus {
        font-style: italic;
    }
`

const NavL = styled(Link)`
    ${linkStyles};
`
const NavA = styled.a`
    ${linkStyles};
`

function NavLink(props) {
    const { to, href } = props
    if (to) return <NavL {...props} />
    if (href) return <NavA {...props} />
}

const NavBreak = styled.hr`
    border: 0;
    ${props =>
        props.borderless ? 'margin: 0.5rem;' : 'margin: 1rem 0.75rem;'};
    ${props => !props.borderless && 'border-bottom: 1px solid #eee'};
`

export default ({ bookshelves, open, toggleNav, logout, loggedIn }) => (
    <NavWrapper open={open}>
        <Nav open={open}>
            <NavTitle>Navigation</NavTitle>
            <NavLink to="/" onClick={toggleNav}>
                Home
            </NavLink>
            <NavLink to="/about" onClick={toggleNav}>
                About
            </NavLink>
            {loggedIn && (
                <div>
                    <NavBreak borderless />
                    <NavHeading>Bookshelves</NavHeading>
                    {isArray(bookshelves) ? (
                        bookshelves.map(shelf => (
                            <NavLink
                                key={shelf.name}
                                to={`/shelf/${shelf.name}`}
                                onClick={toggleNav}
                            >
                                {titlify(shelf.name)}
                                <br />
                            </NavLink>
                        ))
                    ) : (
                        <NavLoading />
                    )}
                </div>
            )}
            <NavBreak />
            {loggedIn ? (
                <NavLink to="/" onClick={logout}>
                    Log out
                </NavLink>
            ) : (
                <NavLink href={`${API_URL}/oauth/goodreads`}>
                    Authorise with Goodreads
                </NavLink>
            )}
        </Nav>
        <NavOverlay open={open} onClick={toggleNav} />
    </NavWrapper>
)
