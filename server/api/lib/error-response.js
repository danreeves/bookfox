export default function(error) {
    const { message } = error
    return { error: message }
}
