import spinnerDivider from './spinnerDivider.js'
import { capitalize, formatLineBreak } from '../../utilities/stringHelpers.js'

export default function(card) {
    return /*html*/ `
    
    <div class="spinner-item">
        <img src="static/img/full-sprocket.svg" class="sprocket-group">
            <div class="spinner-category-inner-con">
                <div class='spinner-category'>
                    <img src="static/img/${ card.img }" alt="${ capitalize(card.name) }" width="20%">
                    <h4 class="category-text">${ formatLineBreak(card.name).toUpperCase() }</h4>
                </div>
            </div>
        <img src="static/img/full-sprocket.svg" class="sprocket-group">
    </div>
    ${ /*spinnerDivider() */ ''}
    `
}