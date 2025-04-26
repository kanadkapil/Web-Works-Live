const textDisplay = document.getElementById('text-display');
const userInput = document.getElementById('user-input');
const resultModal = document.getElementById('result-modal');
const resultWpm = document.getElementById('result-wpm');
const resultAccuracy = document.getElementById('result-accuracy');
const retryButton = document.getElementById('retry-btn');

let timer;
let timeLimit = 15;
let currentText = [];
let currentWord = 0;
let currentLetter = 0;
let startTime;
let errors = 0;

// Sample word list (expand with more words)
const wordList = [
    "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog",
    "hello", "world", "coding", "challenge", "speed", "test", "keyboard",
    "javascript", "developer", "interface", "system", "program", "computer"
];

function generateText() {
    currentText = [];
    for(let i = 0; i < 50; i++) {
        currentText.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    renderText();
}

function renderText() {
    textDisplay.innerHTML = currentText.map((word, wordIndex) => 
        `<span class="word inline-block mx-2" data-word="${wordIndex}">` +
        word.split('').map((letter, letterIndex) => 
            `<span class="letter" data-letter="${letterIndex}">${letter}</span>`
        ).join('') +
        `</span>`
    ).join('');
}

function startTest() {
    generateText();
    userInput.value = '';
    errors = 0;
    currentWord = 0;
    currentLetter = 0;
    startTime = Date.now();
    
    // Set active time mode
    const timeModes = document.querySelectorAll('[data-mode]');
    timeModes.forEach(btn => {
        btn.classList.remove('btn-primary');
        if(btn.textContent === timeLimit + 's') btn.classList.add('btn-primary');
    });

    textDisplay.classList.remove('opacity-50');
    userInput.focus();
    
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer() {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const timeLeft = timeLimit - timeElapsed;
    document.querySelector('[data-stat="time"]').textContent = timeLeft;
    
    if(timeLeft <= 0) endTest();
}

function endTest() {
    clearInterval(timer);
    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = Math.round(((userInput.value.length / 5) / (timeElapsed / 60)));
    const accuracy = Math.round(((userInput.value.length - errors) / userInput.value.length * 100));
    
    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + '%';
    resultModal.showModal();
    
    textDisplay.classList.add('opacity-50');
    userInput.blur();
}

userInput.addEventListener('input', (e) => {
    const input = e.target.value;
    const currentWordEl = textDisplay.querySelector(`[data-word="${currentWord}"]`);
    const letters = currentWordEl?.querySelectorAll('.letter') || [];
    
    // Update letter states
    letters.forEach((letter, index) => {
        const inputChar = input.split(' ')[currentWord]?.[index];
        letter.classList.remove('text-error', 'text-main');
        
        if(inputChar) {
            letter.classList.toggle('text-main', inputChar === letter.textContent);
            letter.classList.toggle('text-error', inputChar !== letter.textContent);
            if(inputChar !== letter.textContent) errors++;
        }
    });

    // Handle word completion
    if(input.endsWith(' ')) {
        currentWord++;
        currentLetter = 0;
    }
});

// Event Listeners
document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
        timeLimit = parseInt(btn.textContent);
        startTest();
    });
});

retryButton.addEventListener('click', () => {
    resultModal.close();
    startTest();
});

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.key === 'Enter') {
        resultModal.close();
        startTest();
    }
});

// Initialize
startTest();