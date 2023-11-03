'use strict';

const startBtn = document.querySelector('.start__btn');
const pauseBtn = document.querySelector('.pause__btn');
const reStartBtn = document.querySelector('.re__start__btn');

const timer = document.querySelector('.timer');
const score = document.querySelector('.score');

const gameStage = document.querySelector('.game__stage');
const gameResult = document.querySelector('.game__result');
const resultText = document.querySelector('.game__result__text');

const carrot = document.querySelectorAll('.carrot');
const bug = document.querySelectorAll('.bug');

let time = 10;
let scoreResult = 0;
let timerInterval;

timer.innerHTML = `${time}`;
score.innerHTML = `${scoreResult}`;

function createItem(btnId) {
  const button = document.querySelector(`#${btnId}`);

  const randomX = Math.floor(Math.random() * 850 + 1);
  const randomY = Math.floor(Math.random() * 150 + 1);

  button.style.display = 'inline-block';
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
}

function pauseTimer() {
  clearInterval(timerInterval);
  gameResult.style.display = 'inline-block';
  resultText.innerHTML = 'REGAME?';

  scoreResult = 0;
}

// 타겟을 넘긴 후 이벤트 리스터 함수 등록
// 캐럿을 눌렀을떄 삭제, 점수 + 1, 점수 등록,
function clickCarrot(e) {
  e.target.style.display = 'none';

  scoreResult = scoreResult + 1;
  score.innerHTML = `${scoreResult}`;

  if (scoreResult === 10) {
    clearInterval(timerInterval);
    gameResult.style.display = 'inline-block';
    pauseBtn.style.visibility = 'hidden';
    resultText.innerHTML = 'YOU WIN';

    scoreResult = 0;
  }
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';

  // 퍼즈를 누르면 인터벌 중지
  pauseBtn.addEventListener('click', pauseTimer);

  for (let i = 1; i <= 10; i++) {
    createItem(`carrot${i}`);
    createItem(`bug${i}`);
  }

  // 캐럿과 버그 생성 후 클릭시 실행될 이벤트

  for (let i = 0; i < 10; i++) {
    carrot[i].addEventListener('click', clickCarrot);

    // 인터벌 종료
    bug[i].addEventListener('click', () => {
      clearInterval(timerInterval);
      gameResult.style.display = 'inline-block';
      pauseBtn.style.visibility = 'hidden';
      resultText.innerHTML = 'YOU LOSE...';

      scoreResult = 0;
    });
  }

  // 1초마다 -1초 하면서 0초가되면 인터벌 중지
  timerInterval = setInterval(() => {
    time = time - 1;
    timer.innerHTML = `${time}`;

    // 0초가 된 경우
    if (time === 0) {
      clearInterval(timerInterval);
      gameResult.style.display = 'inline-block';
      resultText.innerHTML = 'YOU LOSE...';

      scoreResult = 0;
    }
  }, 1000);
});

// 리트라이 하면 타이머 10초로 초기화
reStartBtn.addEventListener('click', () => {
  gameResult.style.display = 'none';

  startBtn.style.display = 'inline-block';

  pauseBtn.style.display = 'none';
  pauseBtn.style.visibility = 'visible';

  time = 10;
  timer.innerHTML = `${time}`;

  scoreResult = 0;
  score.innerHTML = `${scoreResult}`;
});
