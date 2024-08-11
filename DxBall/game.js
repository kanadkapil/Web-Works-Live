const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ballRadius = 16; // Customize ball size here
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 5; // Initial ball speed (horizontal)
let dy = -7; // Initial ball speed (vertical)
const speedIncrement = 0.1; // Speed increment after 5 points
let score = 0; // Initialize score

// Paddle properties
const paddleHeight = 20; // Customize paddle height here
const paddleWidth = 200; // Customize paddle width here
let paddleX = (canvas.width - paddleWidth) / 2;

// Control variables
let rightPressed = false;
let leftPressed = false;

// Bricks properties
const brickRowCount = 6; // Customize number of brick rows here
const brickColumnCount = 9; // Customize number of brick columns here
const brickWidth = 100; // Customize brick width here
const brickHeight = 30; // Customize brick height here
const brickPadding = 14; // Customize padding between bricks here
const brickOffsetTop = 30; // Customize vertical offset of bricks here
const brickOffsetLeft = 30; // Customize horizontal offset of bricks here
const bricks = [];

const colors = {
    1: '#6FDCE3', // Lime color equivalent (Tailwind: bg-lime-400)
    2: '#5C88C4', // Orange color equivalent (Tailwind: bg-orange-400)
    3: '#5C2FC2'  // Red color equivalent (Tailwind: bg-red-400)
};

function initBricks() {
    bricks.length = 0; // Clear existing bricks
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            let hitCount = Math.floor(Math.random() * 3) + 1; // Hit count between 1 and 3
            bricks[c][r] = { x: 0, y: 0, status: hitCount };
        }
    }
}

initBricks();

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', restartGame);

function startGame() {
    document.getElementById('startButton').disabled = true;
    document.getElementById('restartButton').classList.remove('hidden');
    setInterval(draw, 10); // Customize game speed here (interval in milliseconds)
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    x = canvas.width / 2;
    y = canvas.height - 30;
    // !ball speed change 
    dx = 5; // Reset ball speed
    dy = -5; // Reset ball speed
    paddleX = (canvas.width - paddleWidth) / 2;
    initBricks();
    document.getElementById('startButton').disabled = false;
    document.getElementById('restartButton').classList.add('hidden');
}

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFDB5'; // Ball color using Tailwind class equivalent
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    const radius = 10; // Adjust the radius for corner rounding

    ctx.beginPath();
    // Draw the top left corner
    ctx.moveTo(paddleX + radius, canvas.height - paddleHeight);
    ctx.arcTo(paddleX + paddleWidth, canvas.height - paddleHeight, paddleX + paddleWidth, canvas.height - paddleHeight + radius, radius);
    // Draw the bottom right corner
    ctx.arcTo(paddleX + paddleWidth, canvas.height - paddleHeight + radius, paddleX + paddleWidth - radius, canvas.height - paddleHeight + radius, radius);
    // Draw the bottom left corner
    ctx.arcTo(paddleX, canvas.height - paddleHeight + radius, paddleX, canvas.height - paddleHeight, radius);
    // Draw the top right corner
    ctx.arcTo(paddleX, canvas.height - paddleHeight, paddleX + radius, canvas.height - paddleHeight, radius);
    ctx.closePath();

    ctx.fillStyle = '#FFFDB5'; // Paddle color using Tailwind class equivalent
    ctx.fill();
}


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status > 0) {
                const brickX = brickOffsetLeft + c * (brickWidth + brickPadding);
                const brickY = brickOffsetTop + r * (brickHeight + brickPadding);
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colors[bricks[c][r].status]; // Brick color based on hit count using Tailwind class equivalent
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status > 0) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status--;
                    score += 10; // Increment score
                    document.getElementById('score').textContent = `Score: ${score}`;
                    if (score % 50 === 0) { // Increase speed after every 5 points (50/10)
                        dx += dx > 0 ? speedIncrement : -speedIncrement;
                        dy += dy > 0 ? speedIncrement : -speedIncrement;
                    }
                    if (score >= brickRowCount * brickColumnCount * 10) {
                        document.getElementById('startButton').disabled = false;
                        document.getElementById('startButton').textContent = 'You Win!';
                        return;
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            document.getElementById('startButton').disabled = false;
            document.getElementById('startButton').textContent = 'Game Over';
            return;
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 14; // Customize paddle speed here
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 14; // Customize paddle speed here
    }

    x += dx;
    y += dy;
}
