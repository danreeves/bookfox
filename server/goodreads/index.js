import makeHandler from './make-handler'

const endpoints = [
    {
        fnName: 'bookshelves',
        url: 'https://www.goodreads.com/shelf/list.xml',
        key: 'shelves',
        requiredParams: ['key', 'user_id'],
    },
    {
        fnName: 'bookshelf',
        url: 'https://www.goodreads.com/review/list.xml',
        key: 'reviews',
        requiredParams: ['v', 'key', 'shelf'],
        defaultParams: {
            v: 2,
        },
    },
]

export default config =>
    endpoints.reduce((obj, endpoint) => {
        return {
            ...obj,
            [endpoint.fnName]: makeHandler(endpoint, config),
        }
    }, {})
