// Catch the Fruit Game
// Author: Zaiman123
// Simple game using HTML Canvas

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 600;
canvas.style.border = '2px solid #333';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Player (basket)
const basket = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 40,
    width: 80,
    height: 20,
    color: '#2e8b57',
    speed: 7
};

// Fruit
function randomFruit() {
    return {
        x: Math.random() * (canvas.width - 30) + 15,
        y: -30,
        radius: 15,
        color: ['#ff6347', '#ffa500', '#32cd32', '#1e90ff'][Math.floor(Math.random()*4)],
        speed: 2 + Math.random() * 2
    };
}
let fruits = [randomFruit()];
let score = 0;
let gameOver = false;

// Controls
let left = false, right = false;
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') left = true;
    if (e.key === 'ArrowRight') right = true;
});
document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') left = false;
    if (e.key === 'ArrowRight') right = false;
});

function drawBasket() {
    ctx.fillStyle = basket.color;
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
    ctx.beginPath();
    ctx.arc(basket.x + basket.width/2, basket.y, basket.width/2, 0, Math.PI, true);
    ctx.fill();
}

function drawFruit(fruit) {
    ctx.beginPath();
    ctx.arc(fruit.x, fruit.y, fruit.radius, 0, 2 * Math.PI);
    ctx.fillStyle = fruit.color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
}

function update() {
    if (left) basket.x -= basket.speed;
    if (right) basket.x += basket.speed;
    basket.x = Math.max(0, Math.min(canvas.width - basket.width, basket.x));

    fruits.forEach(fruit => {
        fruit.y += fruit.speed;
    });

    // Collision detection
    fruits = fruits.filter(fruit => {
        if (
            fruit.y + fruit.radius > basket.y &&
            fruit.x > basket.x && fruit.x < basket.x + basket.width
        ) {
            score++;
            return false;
        }
        if (fruit.y - fruit.radius > canvas.height) {
            gameOver = true;
            return false;
        }
        return true;
    });

    // Add new fruit
    if (fruits.length < 1 && !gameOver) {
        fruits.push(randomFruit());
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    fruits.forEach(drawFruit);
    ctx.fillStyle = '#222';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 30);
    if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, canvas.height/2 - 60, canvas.width, 120);
        ctx.fillStyle = '#fff';
        ctx.font = '32px Arial';
        ctx.fillText('Game Over!', canvas.width/2 - 90, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, canvas.width/2 - 40, canvas.height/2 + 30);
        ctx.fillText('Refresh to play again', canvas.width/2 - 80, canvas.height/2 + 60);
    }
}

function loop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(loop);
}

loop();
