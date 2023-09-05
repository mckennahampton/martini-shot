import { capitalize, formatLineBreak } from '../../utilities/stringHelpers.js'

export default function(card) {
    return /*html*/ `
    
    <div class='modal-card'>
        <img src="static/img/${ card.img }" alt="${ capitalize(card.name) }" width="25%">
        <h4 class="category-text" style="padding: 25.5px 0 25.5px 20px">${ formatLineBreak(card.name).toUpperCase() }</h4>
    </div>
    
    `
}