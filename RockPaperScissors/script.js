let score = 0;

function playerChoice(playerSelection) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];

    // Display player's choice
    const playerChoiceImg = document.createElement('img');
    playerChoiceImg.src = `assets/${playerSelection}.jpeg`;
    playerChoiceImg.alt = playerSelection;
    updateChoiceDisplay(playerSelection, playerChoiceImg);

    // Display opponent's "awaiting" message initially
    const opponentChoiceImg = document.getElementById('opponentChoice');
    opponentChoiceImg.src = 'assets/awaiting.jpeg';
    opponentChoiceImg.alt = 'Awaiting';

    // Simulate opponent's choice after a delay
    setTimeout(() => {
        opponentChoiceImg.src = `assets/${computerSelection}_opponent.jpeg`;
        opponentChoiceImg.alt = computerSelection;

        const result = getResult(playerSelection, computerSelection);
        displayResult(result);
    }, 1000); // Delay opponent's response for 1 second
}

function updateChoiceDisplay(choice, imgElement) {
    const choicesContainer = document.querySelector('.player .choices');
    const choiceElements = choicesContainer.querySelectorAll('.choice');
    
    // Remove previous active class if exists
    choiceElements.forEach(elem => {
        elem.classList.remove('active');
        elem.innerHTML = ''; // Clear previous content
    });

    // Find the selected choice element and append the image
    const selectedChoiceElement = choicesContainer.querySelector(`.choice[data-choice="${choice}"]`);
    selectedChoiceElement.classList.add('active');
    selectedChoiceElement.appendChild(imgElement);
}

function getResult(player, computer) {
    if (player === computer) {
        return 'It\'s a tie!';
    } else if ((player === 'rock' && computer === 'scissors') ||
               (player === 'paper' && computer === 'rock') ||
               (player === 'scissors' && computer === 'paper')) {
        score++;
        return 'You win!';
    } else {
        score--;
        return 'You lose!';
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;

    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}
