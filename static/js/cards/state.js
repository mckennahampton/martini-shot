import { getRandomInt } from '../utilities/integerHelpers.js'

const state = {
    isSpinning: false,
    cards: [
        {
            img: 'plot_icon1.png',
            name: 'plot\n',
            used: false,
        },
        {
            img: 'cast_director_icon1.png',
            name: `cast \n& director`,
            used: false,
        },
        {
            img: 'quote_icon1.png',
            name: `tagline \n& quote`,
            used: false,
        },
        {
            img: 'characters_icon1.png',
            name: `settings \n& characters`,
            used: false,
        }
    ]
}

export function getAllCards() {
    return state.cards
}

export function getUnused() {
    return state.cards.filter(card => !card.used)
}

export function getRandomUnsedCard() {
    return getUnused()[getRandomInt(0, getUnused().length - 1)]
}

export function setUnused(card) {
    getAllCards().forEach(c => {
        if (c.name == card.name) {
            c.used = true
        }
    })
}

export function setIsSpinning(bool) {
    state.isSpinning = bool
}

export function getIsSpinning() {
    return state.isSpinning
}

export function resetCards() {
    state.cards.forEach(card => card.used = false)
}

export function areAnyUnused() {
    return state.cards.some(card => !card.used)
}

export function isFinalCard() {
    return state.cards.filter(card => !card.used).length == 1
}