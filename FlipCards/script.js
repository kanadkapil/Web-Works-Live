document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWX'.split('').slice(0, 18); // Use first 18 letters for pairs
    const cardArray = [...letters, ...letters]; // 18 unique letters duplicated to create pairs

    cardArray.sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;
    const scoreDisplay = document.getElementById('score');

    function createBoard() {
        cardArray.forEach((letter, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = index;
            card.textContent = ''; // Initially no text shown
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        const cardId = this.dataset.id;
        cardsChosen.push(cardArray[cardId]);
        cardsChosenId.push(cardId);
        this.classList.add('flip');
        this.textContent = cardArray[cardId]; // Show the letter on the card

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [id1, id2] = cardsChosenId;
        const cards = document.querySelectorAll('.card');

        if (cardsChosen[0] === cardsChosen[1] && id1 !== id2) {
            cards[id1].style.visibility = 'hidden'; // Hide matched cards
            cards[id2].style.visibility = 'hidden';
            cardsWon.push(cardsChosen);
            score++;
            scoreDisplay.textContent = score;
        } else {
            cards[id1].classList.remove('flip'); // Flip unmatched cards back
            cards[id2].classList.remove('flip');
            cards[id1].textContent = ''; // Reset text content
            cards[id2].textContent = '';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found all matches!');
        }
    }

    createBoard();
});
