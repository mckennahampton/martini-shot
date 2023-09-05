import categoryCard from './categoryCard.js'

export default function(cards) {
    return cards.map((card, index) => categoryCard(card)).join('')
}