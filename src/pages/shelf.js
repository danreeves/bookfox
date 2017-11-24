import React from 'react'
import { provideState, injectState, update } from 'freactal'
import { get } from 'lodash'
import Page from '../components/page'
import titlify from '../lib/titlify'

const withShelfState = provideState({
    initialState: props => ({
        slug: null,
    }),
    effects: {
        initialize: update((ef, props) => ({
            slug: get(props, 'slug', get(props, 'match.params.shelf', null)),
        })),
    },
})

class Shelf extends React.Component {
    componentWillReceiveProps(nextProps) {
        const currentShelf = get(
            this.props,
            'slug',
            get(this.props, 'match.params.shelf', null)
        )
        const nextShelf = get(
            nextProps,
            'slug',
            get(nextProps, 'match.params.shelf', null)
        )

        if (currentShelf !== nextShelf) {
            this.props.effects.initialize(nextProps)
        }
    }

    render() {
        const { state } = this.props
        return (
            <Page>
                <h1>{titlify(state.slug)}</h1>
            </Page>
        )
    }
}

export default withShelfState(injectState(Shelf))
