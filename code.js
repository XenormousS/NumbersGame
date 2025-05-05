document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");
  const introScreen = document.getElementById("intro-screen");
  const rulesScreen = document.getElementById("rules-screen");
  const countdownScreen = document.getElementById("countdown-screen");
  const countdownNumber = document.getElementById("countdown-number");
  const taskText = document.querySelector("#game-screen .task-box strong");
  const grid = document.getElementById("game-grid");
  const gameHeader = document.getElementById("game-header");
  const scoreEl = gameHeader.querySelector("div:nth-child(3)");

  let currentRound = 0;
  const totalRounds = 12;
  let timeLeft = 60;
  let timerStarted = false;
  let lastScore = 42;
  let totalScore = 0;
  let roundTimer;
  let comboStreak = 0;
  let bonusMultiplier = 1;

  const percentIncreases = [0, 0.15, 0.20, 0.25, 0.27, 0.29, 0.31, 0.33, 0.35, 0.37, 0.39, 0.40];

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

        startGlobalTimer();
        updateBonusDisplay();
        startGameRound();
      }
    }, 1000);
  });

  function startGlobalTimer() {
    updateTimerDisplay();
    roundTimer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(roundTimer);
        endGame();
      }
    }, 1000);
  }

  function startGameRound() {
    currentRound++;
    if (currentRound > totalRounds) {
      endGame();
      return;
    }
  
    updateGameHeader();
  
    const { rows, cols } = getGridSize(currentRound);
    const totalCells = rows * cols;
  
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = '15px';
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  
    const numbers = Array.from({ length: totalCells }, () => Math.floor(Math.random() * 1000 + 1));
    const targetNumber = numbers[Math.floor(Math.random() * numbers.length)];
  
    taskText.textContent = `Найди число: ${targetNumber}`;
    taskText.classList.remove('slide-in');
    void taskText.offsetWidth;
    taskText.classList.add('slide-in');
  
    const fontSize = Math.max(1.2, 2.2 - (rows + cols) * 0.1);
    const gridWidth = Math.min(window.innerWidth * 0.9, 600); 
    let baseCellSize = Math.floor(gridWidth / Math.max(rows, cols));
    if (currentRound >= 10) {
      baseCellSize *= 0.72; 
    } else if (currentRound >= 7) {
      baseCellSize *= 0.65;
    } else if (currentRound >= 4) {
      baseCellSize *= 0.8;
    } else {
      baseCellSize *= 0.84;
    }
    const cellSize = Math.floor(baseCellSize); 
  
    const colors = ["#f97316", "#a78bfa", "#8b5cf6", "#4ade80", "#45c2f4"];
  
    numbers.forEach((num) => {
      const div = document.createElement('div');
      div.classList.add('slide-in');
      div.addEventListener('animationend', () => {
      div.classList.remove('slide-in');

      if (currentRound >= 4) {
        const animationTypes = ['rotate', 'pulse', 'flicker'];
        const chosen = animationTypes[Math.floor(Math.random() * animationTypes.length)];

        if (chosen === 'rotate') {
        span.classList.add('rotate');
      } else if (chosen === 'pulse') {
        div.style.animation = 'pulseSizeOnly 0.8s ease-in-out infinite';
      } else if (chosen === 'flicker') {
        div.style.animation = 'flickerOpacityOnly 0.8s ease-in-out infinite';
      }
    }
}, { once: true });

      
      div.classList.add('grid-item');
      const span = document.createElement('span');
      span.textContent = num;
      span.classList.add('cell-text');
      div.appendChild(span);
      div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      div.style.opacity = Math.random() < 0.5 ? '0.5' : '1';
      div.style.fontSize = `${fontSize}em`;
      taskText.addEventListener('animationend', () => {
        taskText.classList.remove('slide-in');
      }, { once: true });

      const cellWidth = cellSize;
      const cellHeight = Math.floor(cellSize * 0.70);

      div.style.width = `${cellWidth}px`;
      div.style.height = `${cellHeight}px`;
  

      if (Math.random() < 0.3) {
        div.style.animation = 'float 1.5s ease-in-out infinite';
      }
  
      div.addEventListener('click', () => {
        const levelIndex = Math.min(currentRound - 1, percentIncreases.length - 1);
        if (num === targetNumber) {
          const levelBonus = percentIncreases[levelIndex];
          const gainedBase = Math.floor(lastScore + lastScore * levelBonus);
      
          comboStreak++;
          bonusMultiplier = Math.min(Math.max(comboStreak, 1), 5);
      
          const gained = gainedBase * bonusMultiplier;
          lastScore = gainedBase;
          totalScore += gained;
      
          updateScoreDisplay();
        } else {
          comboStreak = 0;
          bonusMultiplier = 1;
        }
      
        updateBonusDisplay();
        startGameRound(); 
      });
      if (currentRound >= 4) {
        const animationTypes = ['rotate', 'pulse', 'flicker'];
      
        if (Math.random() < 1) {
          const chosen = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      
          if (chosen === 'rotate') {
            span.classList.add('rotate');
          } else if (chosen === 'pulse') {
            div.style.animation = 'pulseSizeOnly 0.8s ease-in-out infinite';
          } else if (chosen === 'flicker') {
            div.style.animation = 'flickerOpacityOnly 0.8s ease-in-out infinite';
          }
        }
      }
      
      grid.appendChild(div);
    });
  }
  

  function getGridSize(round) {
    if (round < 4) return { rows: 2, cols: 3 };      
    if (round < 7) return { rows: 3, cols: 4 };       
    if (round < 10) return { rows: 4, cols: 4 };      
    return { rows: 4, cols: 5 };                      
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
  }

  function updateScoreDisplay() {
    scoreEl.textContent = `ОЧКИ ${totalScore}`;
  }

  function updateBonusDisplay() {
    const bonusEl = gameHeader.querySelector("div:nth-child(4)");
    const filled = "●".repeat(Math.min(comboStreak, 5));
    const empty = "○".repeat(Math.max(0, 5 - comboStreak));
    bonusEl.textContent = `БОНУС ${filled}${empty}x${bonusMultiplier}`;
  }

  function endGame() {
    clearInterval(roundTimer);
    grid.innerHTML = '';
    taskText.textContent = 'Игра окончена!';
  }

});
