const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

const playerImg = new Image();
playerImg.src = 'images/man.jpg';

const obstacleImg = new Image();
obstacleImg.src = 'images/burger.jpg';

const rewardImg = new Image();
rewardImg.src = 'images/pizza.jpg'; // Replace with your pizza image path

const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

const obstacles = [];
let score = 0;
let rewardEarned = false;

function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function createObstacle() {
    const obstacle = {
        x: Math.random() * canvas.width,
        y: 0,
        width: 50,
        height: 50,
        speed: 3
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += obstacle.speed;
    });
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') player.dx = player.speed;
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
    if (e.key === 'ArrowUp') player.dy = -player.speed;
    if (e.key === 'ArrowDown') player.dy = player.speed;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') player.dx = 0;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
});

function checkCollisions() {
    obstacles.forEach((obstacle, index) => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            console.log('Collision detected!');
            obstacles.splice(index, 1);
            score++;
            scoreDisplay.textContent = score;

            if (score >= 100 && !rewardEarned) {
                rewardEarned = true;
                giveReward();
            }
        }
    });
}

function giveReward() {
    // Logic to give reward (e.g., extra pizza)
    // For simplicity, we'll just log a message here
    console.log('Congratulations! You earned an extra pizza!');
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    drawPlayer();
    drawObstacles();
    moveObstacles();
    checkCollisions();

    requestAnimationFrame(update);
}

setInterval(createObstacle, 2000);
update();
