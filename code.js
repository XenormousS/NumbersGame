document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");
  const introScreen = document.getElementById("intro-screen");
  const rulesScreen = document.getElementById("rules-screen");
  const countdownScreen = document.getElementById("countdown-screen");
  const countdownNumber = document.getElementById("countdown-number");
  const taskText = document.querySelector("#game-screen .task-box strong");
  const grid = document.getElementById("game-grid");
  const gameHeader = document.getElementById("game-header");

  let currentRound = 0;
  const totalRounds = 12;
  let roundTimer;
  let timeLeft = 60;

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      introScreen.style.display = "none";
      rulesScreen.style.display = "block";
    });
  }

  let countdownStarted = false;

  rulesScreen.addEventListener("click", function startCountdown() {
    if (countdownStarted) return;
    countdownStarted = true;

    rulesScreen.style.display = "none";
    countdownScreen.style.display = "flex";
    let count = 3;
    countdownNumber.textContent = count;
  
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNumber.textContent = count;
        countdownNumber.classList.remove("pop");
        void countdownNumber.offsetWidth;
        countdownNumber.classList.add("pop");
      } else {
        clearInterval(countdownInterval);
        countdownScreen.style.display = "none";
        document.getElementById("game-screen").style.display = "block";
        gameHeader.style.display = "flex";
        startGameRound();
      }
    }, 1000);
  });

  function startGameRound() {
    currentRound++;
    if (currentRound > totalRounds) {
      endGame();
      return;
    }

    updateGameHeader();
    resetTimer();

    const targetNumber = Math.floor(Math.random() * 900) + 100;
    taskText.textContent = targetNumber;

    const totalCells = 6;
    const numbers = Array.from({ length: totalCells - 1 }, () => Math.floor(Math.random() * 900) + 100);
    const correctIndex = Math.floor(Math.random() * totalCells);
    numbers.splice(correctIndex, 0, targetNumber);

    const colors = ['#f97316', '#a78bfa', '#8b5cf6', '#4ade80', '#45c2f4', '#3cb4ec'];
    grid.innerHTML = '';

    numbers.forEach((num) => {
      const div = document.createElement('div');
      div.classList.add('grid-item');
      div.textContent = num;
      div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      div.style.opacity = Math.random() < 0.5 ? '0.5' : '1';

      if (Math.random() < 0.3) {
        div.style.animation = 'float 1.5s ease-in-out infinite';
      }

      div.addEventListener('click', () => {
        clearInterval(roundTimer);
        startGameRound();
      });

      grid.appendChild(div);
    });
  }

  function resetTimer() {
    timeLeft = 60;
    updateTimerDisplay();
    roundTimer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(roundTimer);
        startGameRound();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById("timer");
    if (timerEl) {
      timerEl.textContent = `00:${String(timeLeft).padStart(2, '0')}`;
    }
  }

  function updateGameHeader() {
    const levelEl = document.getElementById("level");
    levelEl.textContent = `УРОВЕНЬ ${currentRound}-${totalRounds}`;
    updateTimerDisplay();
  }

  function endGame() {
    clearInterval(roundTimer);
    grid.innerHTML = '';
    taskText.textContent = 'Игра окончена!';
    alert("Поздравляем! Все 12 раундов завершены.");
  }


  const style = document.createElement('style');
  style.textContent = `
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}`;
  document.head.appendChild(style);
});
