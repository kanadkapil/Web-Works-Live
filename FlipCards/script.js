document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cardArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
    ];

    cardArray.sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((card, i) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-id', i);
            cardElement.addEventListener('click', flipCard);
            grid.appendChild(cardElement);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add('flip');
        this.textContent = cardArray[cardId].img;

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cardsWon.push(cardsChosen);
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
        } else {
            cards[optionOneId].classList.remove('flip');
            cards[optionTwoId].classList.remove('flip');
            cards[optionOneId].textContent = '';
            cards[optionTwoId].textContent = '';
        }
        cardsChosen = [];
        cardsChosenId = [];
    }

    createBoard();
});
