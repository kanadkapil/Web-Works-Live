let score = 0;
let currentPlayerChoice = null; // Track current player choice

function playerChoice(playerSelection) {
    if (currentPlayerChoice === playerSelection) {
        return; // Prevent selecting the same choice twice in a row
    }
    
    const choicesContainer = document.querySelector('.player .choices');
    const choiceElements = choicesContainer.querySelectorAll('.choice');
    
    // Remove active class from all choices
    choiceElements.forEach(elem => {
        elem.classList.remove('active');
    });
    
    // Add active class to the selected choice
    const selectedChoiceElement = choicesContainer.querySelector(`.choice[data-choice="${playerSelection}"]`);
    selectedChoiceElement.classList.add('active');
    
    // Update current player choice
    currentPlayerChoice = playerSelection;

    // Display opponent's "awaiting" message initially
    const opponentChoiceImg = document.getElementById('opponentChoice');
    opponentChoiceImg.src = 'assets/awaiting.jpeg';
    opponentChoiceImg.alt = 'Awaiting';

    // Simulate opponent's choice after a delay
    setTimeout(() => {
        const choices = ['rock', 'paper', 'scissors'];
        const computerSelection = choices[Math.floor(Math.random() * choices.length)];
        
        opponentChoiceImg.src = `assets/${computerSelection}_opponent.jpeg`;
        opponentChoiceImg.alt = computerSelection;
        
        const result = getResult(playerSelection, computerSelection);
        displayResult(result);
    }, 1000); // Delay opponent's response for 1 second
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
