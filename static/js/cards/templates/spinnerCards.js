import spinnerCard from './spinnerCard.js'

// Create a large repeating list for our animation
export default function(cards) {
    let result = ''
    for(var x = 0; x < 29; x++){
        result += cards.map((card, index) => spinnerCard(card)).join('')
    }
    return result
}