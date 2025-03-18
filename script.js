const gameContainer = document.getElementById('game-container');
const bird = document.getElementById('bird');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

let birdTop = 250;
let gravity = 2;
let jumpStrength = -30;
let score = 0;
let gameInterval;
let pipeInterval;

function startGame() {
    birdTop = 250;
    score = 0;
    scoreElement.innerText = 'Score: 0';
    gameContainer.innerHTML = '<div id="bird"></div><div id="score">Score: 0</div>';
    bird.style.top = birdTop + 'px';
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    gameInterval = setInterval(updateGame, 20);
    pipeInterval = setInterval(createPipe, 2000);
}

function updateGame() {
    birdTop += gravity;
    bird.style.top = birdTop + 'px';

    if (birdTop <= 0 || birdTop >= 560) {
        endGame();
    }

    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        let pipeTop = parseInt(pipe.style.top);
        let pipeBottom = pipeTop + 200;

        if (
            pipeLeft < 90 && pipeLeft > 50 &&
            (birdTop < pipeTop || birdTop > pipeBottom)
        ) {
            endGame();
        }

        if (pipeLeft === 50) {
            score++;
            scoreElement.innerText = 'Score: ' + score;
        }
    });
}

function createPipe() {
    const pipeGap = 200;
    const pipeTop = Math.random() * (400 - pipeGap);
    const pipeBottom = pipeTop + pipeGap;

    const topPipe = document.createElement('div');
    topPipe.className = 'pipe';
    topPipe.style.top = '0px';
    topPipe.style.left = '400px';
    topPipe.style.height = pipeTop + 'px';
    gameContainer.appendChild(topPipe);

    const bottomPipe = document.createElement('div');
    bottomPipe.className = 'pipe';
    bottomPipe.style.top = pipeBottom + 'px';
    bottomPipe.style.left = '400px';
    bottomPipe.style.height = (600 - pipeBottom) + 'px';
    gameContainer.appendChild(bottomPipe);

    movePipes();
}

function movePipes() {
    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        pipeLeft -= 2;
        pipe.style.left = pipeLeft + 'px';

        if (pipeLeft < -60) {
            pipe.remove();
        }
    });
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(pipeInterval);
    restartButton.style.display = 'block';
    alert('Game Over! Your score: ' + score);
}

function jump() {
    birdTop += jumpStrength;
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', () => {
    jump();
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);