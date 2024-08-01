document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    // Use emojis directly as a string instead of using split() method
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '😊', '😎', '😍', '😘', '😜', '😝', '😛', '😋', '🤩']; 
    const cardArray = [...emojis, ...emojis]; // Duplicate emojis for pairs

    cardArray.sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;
    const scoreDisplay = document.getElementById('score');

    function createBoard() {
        cardArray.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-red-400', 'rounded', 'flex', 'items-center', 'justify-center', 'text-4xl', 'cursor-pointer', 'transition-transform', 'duration-300', 'w-14', 'h-14', 'sm:w-20', 'sm:h-24');
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
        this.classList.add('transform', 'rotate-180');
        this.textContent = cardArray[cardId]; // Show the emoji on the card

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const [id1, id2] = cardsChosenId;
        const cards = document.querySelectorAll('.card');

        if (cardsChosen[0] === cardsChosen[1] && id1 !== id2) {
            cards[id1].classList.add('opacity-0'); // Hide matched cards
            cards[id2].classList.add('opacity-0');
            cardsWon.push(cardsChosen);
            score++;
            scoreDisplay.textContent = score;
        } else {
            cards[id1].classList.remove('transform', 'rotate-180'); // Flip unmatched cards back
            cards[id2].classList.remove('transform', 'rotate-180');
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
