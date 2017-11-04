import request from 'request-promise-native'
import { parseString } from 'xml2js'
import { get, isObject, isArray, isString } from 'lodash'
import { GOODREADS_KEY, GOODREADS_SECRET } from '../env'

function parseXml(string) {
    return new Promise((resolve, reject) => {
        parseString(string, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

/**
 * Reformats the horrible post-xml junk
 * into nicely readable json
 * removes $ and _ metadata
 */
function unmeta(data) {
    if (isString(data)) return data
    if (isArray(data) && data.length > 1) return data.map(unmeta)
    if (isArray(data) && data.length === 1) return unmeta(data[0])
    if (isObject(data)) {
        const keys = Object.keys(data).filter(key => key !== '$' && key !== '_')
        if (keys.length === 1 && isObject(data[keys[0]])) {
            return unmeta(data[keys[0]])
        }
    }
    return Object.keys(data).reduce((unmetaed, key) => {
        if (isArray(data[key]) && data[key].length === 1) {
            if (isObject(data[key][0])) {
                if ('_' in data[key][0]) {
                    unmetaed[key] = data[key][0]['_']
                } else if ('$' in data[key][0]) {
                    if (
                        'nil' in data[key][0]['$'] &&
                        data[key][0]['$']['nil'] === 'true'
                    ) {
                        unmetaed[key] = null
                    }
                } else if (Object.keys(data[key][0]).length === 1) {
                    unmetaed[key] = unmeta(
                        data[key][0][Object.keys(data[key][0])[0]]
                    )
                } else {
                    unmetaed[key] = unmeta(data[key])
                }
            }
            if (typeof data[key][0] === 'string') {
                unmetaed[key] = unmeta(data[key][0])
            }
        }
        if (isArray(data[key]) && data[key].length > 1) {
            unmetaed[key] = unmeta(data[key])
        }
        return unmetaed
    }, {})
}

export default function(endpoint, globalConfig) {
    const { url, key, fnName, defaultParams } = endpoint
    const { api_key } = globalConfig
    return async function(params, oauth) {
        const qs = {
            ...defaultParams,
            ...params,
            key: api_key,
        }
        const requiredErrors = endpoint.requiredParams.filter(
            param => !(param in qs)
        )
        if (requiredErrors.length) {
            throw new Error(
                'Required params missing: ' + requiredErrors.join(', ')
            )
        }
        try {
            console.time('> timing: request')
            const body = await request.get({
                url,
                qs,
                oauth: oauth && {
                    token: oauth.token,
                    token_secret: oauth.tokenSecret,
                    consumer_key: GOODREADS_KEY,
                    consumer_secret: GOODREADS_SECRET,
                },
            })
            console.timeEnd('> timing: request')
            console.time('> timing: parseXml')
            const json = await parseXml(body)
            console.timeEnd('> timing: parseXml')
            const data = get(json['GoodreadsResponse'], key)
            console.time('> timing: unmeta')
            const cleanedData = unmeta(data)
            console.timeEnd('> timing: unmeta')
            return { [fnName]: cleanedData }
        } catch (err) {
            const error = get(err, 'response.body', err.message).split('\n')[0]
            throw new Error(error)
        }
    }
}
