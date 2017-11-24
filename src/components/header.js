import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    position: sticky;
    background: #fff;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #eee;
    z-index: 99999999;
`

const ButtonText = styled.span`
    border: 2px solid #000;
    padding: 0.5rem;
    border-radius: 4px;
    &:before {
        content: '\\2630';
        padding-right: 0.25em;
        font-style: normal !important;
    }
`

const NavButton = styled.button`
    background: none;
    border: none;
    font-family: inherit;
    padding: 1rem;
    outline: none;
    &:hover ${ButtonText}, &:focus ${ButtonText} {
        font-style: italic;
    }
`

const UserInfo = styled.p`
    margin-top: auto;
    margin-bottom: 1.55rem;
    margin-left: auto;
    margin-right: 1rem;
`

const Username = styled.span`
    @media (max-width: 475px) {
        display: none;
    }
`

const Title = styled.h1`
    margin: auto 0;
`

export default ({ toggleNav, user, logout }) => (
    <Container>
        <NavButton onClick={toggleNav}>
            <ButtonText>Menu</ButtonText>
        </NavButton>
        <Title>Bookfox</Title>
        {user && (
            <UserInfo>
                <Username>Hey, {user.displayName}. </Username>
                <Link to="/" onClick={logout}>
                    Log out?
                </Link>
            </UserInfo>
        )}
    </Container>
)
