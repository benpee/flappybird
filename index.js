document.addEventListener('DOMContentLoaded', function () {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const sky = document.querySelector('.sky');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;
    function startGame() {
        birdBottom -= gravity;
        bird.style.left = `${birdLeft}px`;
        bird.style.bottom = `${birdBottom}px`;
    }

    let gameTimerId = setInterval(startGame, 20);
    // clearInterval(timerId);

    function control(e) {
        if (e.keyCode === 32) jump()
        // keyCode 32 is space bar
    }

    function jump() {
        birdBottom += birdBottom < 500 ? 50 : "";
        bird.style.bottom = `${birdBottom}px`;
    };

    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('.topObstacle');
        }
        gameDisplay.appendChild('obstacle');
        gameDisplay.appendChild('topObstacle');
        obstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.left = `${obstacleLeft}px`;
        obstacle.style.bottom = `${obstacleBottom}px`;
        topObstacle.style.bottom = `${obstacleBottom + gap}px`;

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = `${obstacle}px`;
            topObstacle.style.left = `${obstacle}px`;

            if (obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 &&
                birdLeft === 220 && (birdBottom < obstacleBottom + 153 ||
                    birdBottom > obstacleBottom + gap - 200) || birdBottom === 0
            ) {
                gameOver();
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }
    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }

})