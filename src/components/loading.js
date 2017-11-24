import React from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
`

const loadingAnimation = keyframes`
    to {
        width: 1.2em;
    }
`
const LoadingText = styled.div.attrs({
    children: 'Loading',
})`
    &:after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        animation: ${loadingAnimation} steps(4, end) 4s infinite;
        content: '\\2026'; /* ascii code for the ellipsis character */
        width: 0px;
    }
`

export default function PageLoading() {
    return (
        <Wrapper>
            <LoadingText />
        </Wrapper>
    )
}
