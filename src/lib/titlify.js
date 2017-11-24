import { isString } from 'lodash'

export default function titlify(string) {
    if (!isString(string)) return ''
    return (
        string[0].toUpperCase() +
        string.replace(/-/g, ' ').slice(1, string.length)
    )
}
