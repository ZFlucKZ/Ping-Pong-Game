let rodPlayer1 = document.getElementsByClassName('rod-player1')[0];
let rodPlayer2 = document.getElementsByClassName('rod-player2')[0];
let ball = document.getElementById('ball');
let name = document.getElementById('game-name');
let description = document.getElementById('description');
let scorePlayer1 = document.getElementsByClassName('score-player1')[0];
let scorePlayer2 = document.getElementsByClassName('score-player2')[0];

let vpWidth = window.innerWidth;
let vpHeight = window.innerHeight;

let ballMoving;
let moveRodDistance = 20;
let ballSpeed = 15;
let gameRunning = 0;

const direction = [-1, 1];
// -1 is move left and move top
// 1 is move right and move bottom

let BallMoveTopOrBottom = randomDirection();
let BallMoveLeftOrRight = randomDirection();

document.addEventListener('keydown', function (e) {
  let rodPlayer1Coor = rodPlayer1.getBoundingClientRect();
  let rodPlayer2Coor = rodPlayer2.getBoundingClientRect();
  // console.log(e);

  //************************* Rods Movement **************************//
  if (rodPlayer1Coor.left >= 5) {
    if ((e.key == 'a' || e.key == 'ArrowLeft') && gameRunning == 1) {
      rodPlayer1.style.left = rodPlayer1Coor.left - moveRodDistance + 'px';
      rodPlayer2.style.left = rodPlayer2Coor.left - moveRodDistance + 'px';
    }
  }

  if (rodPlayer1Coor.right <= vpWidth - 5) {
    if ((e.key == 'd' || e.key == 'ArrowRight') && gameRunning == 1) {
      rodPlayer1.style.left = rodPlayer1Coor.left + moveRodDistance + 'px';
      rodPlayer2.style.left = rodPlayer2Coor.left + moveRodDistance + 'px';
    }
  }

  if (e.key == 'r') {
    resetGame();
    gameRunning = 1;
    scorePlayer1.innerHTML = 0;
    scorePlayer2.innerHTML = 0;
    ballMoving = setInterval(moveBall, ballSpeed);
  }

  if (e.key == ' ') {
    resetGame();
    gameRunning = 1;
    ballMoving = setInterval(moveBall, ballSpeed);
  }
});

//************************* Move Ball Function **************************//
function moveBall() {
  let ballCoor = ball.getBoundingClientRect();
  let rodPlayer1Coor = rodPlayer1.getBoundingClientRect();

  if (ballCoor.top <= 17 || ballCoor.bottom >= vpHeight - 17) {
    //******************** Check Ball Coor. and Score *********************//
    if (
      ballCoor.left - rodPlayer1Coor.left <= -10 ||
      ballCoor.left - rodPlayer1Coor.left >= 170
    ) {
      gameRunning = 0;
      clearInterval(ballMoving);

      name.style.display = 'block';
      name.innerHTML = `Player ${ballCoor.top <= 17 ? 2 : 1} Wins!`;
      description.style.display = 'block';
      description.innerHTML =
        'Press Space Bar to Continue | Press R to Reset Game';
      ballCoor.top <= 17
        ? (scorePlayer2.innerHTML = parseInt(scorePlayer2.innerHTML) + 1)
        : (scorePlayer1.innerHTML = parseInt(scorePlayer1.innerHTML) + 1);

      scorePlayer1.style.display = 'block';
      scorePlayer2.style.display = 'block';

      return;
    }

    //************************* Change Direction **************************//
    BallMoveTopOrBottom *= -1;
    if (ballSpeed > 1) {
      ballSpeed -= 1;
      clearInterval(ballMoving);
      ballMoving = setInterval(moveBall, ballSpeed);
    }
  }
  //************************* Change Direction **************************//
  if (ballCoor.left <= 5 || ballCoor.right >= vpWidth - 5) {
    BallMoveLeftOrRight *= -1;
  }

  //************************* Move Ball **************************//
  if (BallMoveTopOrBottom == -1 && BallMoveLeftOrRight == -1) {
    ball.style.top = ballCoor.top - 2 + 'px';
    ball.style.left = ballCoor.left - 2 + 'px';
  } else if (BallMoveTopOrBottom == 1 && BallMoveLeftOrRight == 1) {
    ball.style.top = ballCoor.top + 2 + 'px';
    ball.style.left = ballCoor.left + 2 + 'px';
  } else if (BallMoveTopOrBottom == -1 && BallMoveLeftOrRight == 1) {
    ball.style.top = ballCoor.top - 2 + 'px';
    ball.style.left = ballCoor.left + 2 + 'px';
  } else if (BallMoveTopOrBottom == 1 && BallMoveLeftOrRight == -1) {
    ball.style.top = ballCoor.top + 2 + 'px';
    ball.style.left = ballCoor.left - 2 + 'px';
  }
}

//*************** Reset Ping Pong Table Function ****************//
function resetGame() {
  ball.style.top = 'calc(50% - 10px)';
  ball.style.left = 'calc(50% - 10px)';
  rodPlayer1.style.top = 'calc(0% + 5px)';
  rodPlayer1.style.left = 'calc(50% - 80px)';
  rodPlayer2.style.bottom = 'calc(0% + 5px)';
  rodPlayer2.style.left = 'calc(50% - 80px)';
  name.style.display = 'none';
  description.style.display = 'none';
  scorePlayer1.style.display = 'none';
  scorePlayer2.style.display = 'none';
  ballSpeed = 15;
  BallMoveTopOrBottom = randomDirection();
  BallMoveLeftOrRight = randomDirection();
}

//*************** Random Direction Function ****************//
function randomDirection() {
  return direction[Math.floor(Math.random() * direction.length)];
}
