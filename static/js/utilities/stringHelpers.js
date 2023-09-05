// Capitlizes first character of a string
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatLineBreak(string) {
    return string.includes('\n')
    ? string.split('\n').map((line, index) => index > 0 ? `<br>${line}` : line).join('')
    : string
}