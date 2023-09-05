import modalCard from './cards/templates/modalCard.js'
import spinnerCards from './cards/templates/spinnerCards.js'
import categoryCards from './cards/templates/categoryCards.js'
import { getAllCards, getUnused, getRandomUnsedCard, setUnused, setIsSpinning, getIsSpinning, resetCards, areAnyUnused } from './cards/state.js';

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function updatePadding() {
    var footer = document.querySelector('footer');
    var contentWrap = document.querySelector('#content-wrap');
    var footerHeight = footer.offsetHeight;

    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var additionalPadding = 50;
    contentWrap.style.paddingBottom = (footerHeight + additionalPadding) + 'px';
}

window.addEventListener('load', function() {
    updatePadding(); // Initial update on page load
});

window.addEventListener('resize', function() {
    updatePadding(); // Update on screen size change
});

//#region Cards

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue.includes('px')
    ? strValue.substring(0, strValue.length - 2)
    : strValue
}

const resetSpinnerOffset = () => {
    // Offset spinner to center
    const cardWidth = document.querySelector('#spinnerCon .spinner-item').clientWidth
    const innerSpinnerCon = document.querySelector('#spinnerCon .spinner-category-inner-con')

    // const dividerWidth = document.querySelector('#spinnerCon .divider').clientWidth
    const offsetLeft = (window.innerWidth / 2) - ((cardWidth /* + dividerWidth */) * 2) - ((cardWidth /* + dividerWidth */) / 2) + (Math.round(getStyle(innerSpinnerCon, 'padding-right')) / 2)
    document.querySelector('#spinnerCon').style.marginLeft = offsetLeft + 'px'
}

const renderCategoryCards = () => {
    document.querySelector('#categoryCon').innerHTML = categoryCards(getAllCards())
}

const renderSpinnerCards = () => {
    document.querySelector('#spinnerCon').innerHTML = spinnerCards(getAllCards())

    resetSpinnerOffset()
}

const openModal = (card) => {
    const modal = document.querySelector('#cardModal')
    const modalOverlay = document.querySelector('#modalOverlay')
    modal.querySelector('#modalContent').innerHTML = modalCard(card)
    modalOverlay.classList.remove('fade-out')
    modalOverlay.classList.add('fade-in')
    modal.classList.remove('fade-out')
    modal.classList.add('fade-in')
    document.querySelector('html').style.overflowY = 'hidden'
}

const closeModal = () => {
    const modal = document.querySelector('#cardModal')
    const modalOverlay = document.querySelector('#modalOverlay')
    modalOverlay.classList.remove('fade-in')
    modalOverlay.classList.add('fade-out')
    modal.classList.remove('fade-in')
    modal.classList.add('fade-out')
    document.querySelector('html').style.overflowY = 'scroll'
}

const spinWheel = () => {
    setIsSpinning(true)
    const duration = 4
    let selection = getRandomUnsedCard()
    let position = getAllCards().indexOf(selection)
    const spinner = document.querySelector('#spinnerCon')
    const cardWidth = spinner.querySelector('.spinner-item').clientWidth
    const innerSpinnerCon = document.querySelector('#spinnerCon .spinner-category-inner-con')
    // const dividerWidth = spinner.querySelector('.divider').clientWidth
    const landingPosition =
        (position + getAllCards().length) // Handles selected indexes including 0, for example if the selected card is at 0 and the overall length is 4, the position is 5
        * (cardWidth /* + dividerWidth */) // Multiplier for the card + divider DOM width for transition
        + ((cardWidth /* + dividerWidth */) * getAllCards().length * 3) // How many "rotations" we want to animate through
        + ((cardWidth /* + dividerWidth */) * 2) // Offset to account for the initial 2nd card centering
    
    resetSpinnerOffset()
    setUnused(selection)
    spinner.style.transform = 'translate3d(0, 0, 0)';
    spinner.style.transitionTimingFunction = 'cubic-bezier(0.32, 0, 0.38, 1)';
    spinner.style.transitionDuration = duration + 's';
    spinner.style.transform = 'translate3d(-' + landingPosition + 'px, 0px, 0px)';
    
    setTimeout(function(){
        spinner.style.transitionTimingFunction = ''
        spinner.style.transitionDuration = ''
      
        const offsetLeft = (window.innerWidth / 2) - (cardWidth * (position + getAllCards().length)) - ((cardWidth /* + dividerWidth */) / 2) + (Math.round(getStyle(innerSpinnerCon, 'padding-right')) / 2)
        spinner.style.marginLeft = offsetLeft + 'px'
        spinner.style.transform = 'none'

        setIsSpinning(false)
        openModal(selection)
        renderCategoryCards()
        if (!areAnyUnused()) {
            document.querySelector('.spinner-container').classList.add('disabled')
        }
    }, duration * 1000);
}

document.addEventListener('DOMContentLoaded', () => {

    // Initial render of the cards
    renderCategoryCards()
    renderSpinnerCards()

    document.addEventListener('click', function(e) {
        if (e.target.closest('.spinner-container')) {
            document.querySelector('#spinnerOverlay').classList.add('fade-out')
            if (!getIsSpinning() && areAnyUnused()) {
                spinWheel()
            }
        }

        else if (e.target.closest('.modal-close') || e.target.closest('#modalOverlay')) {
            closeModal()
        }

        else if (e.target.closest('#spinnerReset')) {
            document.querySelector('.spinner-container').classList.remove('disabled')
            resetCards()
            renderCategoryCards()
            renderSpinnerCards()
        }
    })

})

//#endregion
