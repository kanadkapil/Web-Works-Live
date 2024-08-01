document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const pairSelect = document.getElementById('pair-select');
    const startButton = document.getElementById('start-button');

    let cardArray = [];
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;

    function createBoard() {
        grid.innerHTML = ''; // Clear the grid
        const pairs = parseInt(pairSelect.value);
        const emojis = ['😈', '😐', '🙈', '🐸', '💀', '🥺', '🧬', '🍇', '🍉', '🍕', '🐧', '🥃', '💩', '💘']; // Adjust if needed
        cardArray = [...emojis.slice(0, pairs), ...emojis.slice(0, pairs)]; // Use only the required number of emojis

        cardArray.sort(() => 0.5 - Math.random());

        cardArray.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'bg-lime-400', 'rounded-2xl', 'flex', 'items-center', 'justify-center', 'text-4xl', 'cursor-pointer', 'transition-transform', 'duration-300', 'w-14', 'h-14','sm:w-20', 'sm:h-28');
            card.dataset.id = index;
            card.style.transform = 'rotate(180deg)'; // Hide cards initially
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => {
                card.style.transform = 'rotate(0deg)'; // Show all cards for 3 seconds
                card.textContent = cardArray[card.dataset.id]; // Show emoji
            });
            setTimeout(() => {
                document.querySelectorAll('.card').forEach(card => {
                    card.style.transform = 'rotate(180deg)'; // Hide cards again
                    card.textContent = ''; // Remove emoji
                });
            }, 3000); // Hide after 3 seconds
        }, 500); // Initial delay to allow DOM updates
    }

    function flipCard() {
        const cardId = this.dataset.id;
        cardsChosen.push(cardArray[cardId]);
        cardsChosenId.push(cardId);
        this.style.transform = 'rotate(0deg)'; // Show the card
        this.textContent = cardArray[cardId]; // Show the emoji

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

    startButton.addEventListener('click', createBoard);
});
