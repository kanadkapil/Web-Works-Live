document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const emojis = ['😈', '😐', '👍', '🙈', '🐸', '💀', '🤣', '🥺', '🧬', '🦚', '🍇', '🍉'];
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
            card.classList.add('card', 'bg-lime-400', 'rounded-2xl', 'flex', 'items-center', 'justify-center', 'text-4xl', 'cursor-pointer', 'transition-transform', 'duration-300', 'w-14', 'h-14', 'sm:w-20', 'sm:h-24');
            card.dataset.id = index;
            card.textContent = ''; // Initially no text shown
            card.style.transform = 'rotate(180deg)'; // Hide cards initially
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });

        // Show cards for 3 seconds
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.transform = 'rotate(0deg)'; // Show cards
                card.textContent = cardArray[card.dataset.id]; // Show emoji
            });

            // Hide cards after 3 seconds
            setTimeout(() => {
                cards.forEach(card => {
                    card.style.transform = 'rotate(180deg)'; // Hide cards again
                    card.textContent = ''; // Clear emoji
                });
            }, 3000);
        }, 500); // Short delay for better UX
    }

    function flipCard() {
        const cardId = this.dataset.id;
        if (cardsChosen.length === 2 || this.style.transform === 'rotate(0deg)') return; // Prevent action if already flipped or two cards are open

        cardsChosen.push(cardArray[cardId]);
        cardsChosenId.push(cardId);
        this.style.transform = 'rotate(0deg)'; // Show the card
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
            cards[id1].style.transform = 'rotate(180deg)'; // Flip unmatched cards back
            cards[id2].style.transform = 'rotate(180deg)';
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
