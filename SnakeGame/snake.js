const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // size of the snake and food
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let bonusFood = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let gameSpeed = 200; // initial speed in milliseconds
let speedIncrement = 10; // speed increase in milliseconds
let d;
let snakeColor = 'green'; // default snake color

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode == 37 && d != 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode == 38 && d != 'DOWN') {
    d = 'UP';
  } else if (event.keyCode == 39 && d != 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode == 40 && d != 'UP') {
    d = 'DOWN';
  }
}

function collision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? snakeColor : 'white';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  ctx.fillStyle = 'orange'; // bonus food color
  ctx.fillRect(bonusFood.x, bonusFood.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  // Check collision with bonus food
  if (snakeX == bonusFood.x && snakeY == bonusFood.y) {
    score += 5;
    bonusFood = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  // Check collision with regular food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // Game over conditions
  if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
    clearInterval(game);
    alert("GAME OVER.....🐸");
  }

  snake.unshift(newHead);

  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText("Score: " + score, 2 * box, 1.6 * box);
}

// Start game
let game = setInterval(draw, gameSpeed);

// Increase speed gradually
function increaseSpeed() {
  gameSpeed -= speedIncrement;
  clearInterval(game);
  game = setInterval(draw, gameSpeed);
}
setInterval(increaseSpeed, 5000); // increase speed every 5 seconds

// Change snake color function
function changeSnakeColor() {
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // generate random hex color
  snakeColor = randomColor;
}
