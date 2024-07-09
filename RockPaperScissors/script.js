function playerChoice(playerSelection) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];

    // Display player's choice
    const playerChoiceImg = document.createElement('img');
    playerChoiceImg.src = `assets/${playerSelection}.jpeg`;
    playerChoiceImg.alt = playerSelection;
    updateChoiceDisplay(playerSelection, playerChoiceImg);

    // Display opponent's choice
    const opponentChoiceImgs = document.querySelectorAll('.opponent-response .choice .opponent-img');
    opponentChoiceImgs.forEach(img => {
        img.style.display = 'none'; // Hide all opponent images
    });
    const opponentChoiceImg = document.querySelector(`.opponent-response .choice[data-choice="${computerSelection}"] .opponent-img`);
    opponentChoiceImg.style.display = 'block'; // Show the selected opponent image

    const result = getResult(playerSelection, computerSelection);
    displayResult(result);
}

function updateChoiceDisplay(choice, imgElement) {
    const choicesContainer = document.querySelector('.choices');
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
        return 'You win!';
    } else {
        return 'You lose!';
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}
