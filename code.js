document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");
  const introScreen = document.getElementById("intro-screen");
  const rulesScreen = document.getElementById("rules-screen");
  const countdownScreen = document.getElementById("countdown-screen");
  const countdownNumber = document.getElementById("countdown-number");

  if (nextBtn && introScreen) {
    nextBtn.addEventListener("click", function () {
      introScreen.style.display = "none";
      rulesScreen.style.display = "block";
    });
  }

  rulesScreen.addEventListener("click", function startCountdown() {
    rulesScreen.removeEventListener("click", startCountdown);
    rulesScreen.style.display = "none";
    countdownScreen.style.display = "flex";

    let count = 3;
    countdownNumber.textContent = count;

    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNumber.textContent = count;
        countdownNumber.classList.remove('pop');
        void countdownNumber.offsetWidth;
        countdownNumber.classList.add('pop');
      } else {
        clearInterval(countdownInterval);
        countdownScreen.style.display = "none";
        rulesScreen.style.display = "block";
        startGameRound();
      }
    }, 1000);
  });
});


document.querySelector('#rules-screen').addEventListener('click', () => {
  document.querySelector('#rules-screen').style.display = 'none';
  document.querySelector('#countdown-screen').style.display = 'flex';

  let count = 3;
  const countdownNumber = document.getElementById('countdown-number');
  countdownNumber.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
      countdownNumber.classList.remove('pop');
      void countdownNumber.offsetWidth; 
      countdownNumber.classList.add('pop');
    } else {
      clearInterval(countdownInterval);
      document.querySelector('#countdown-screen').style.display = 'none';

    }
  }, 1000);
});

function startGameRound() {
  const grid = document.querySelector('.grid');
  const taskText = document.querySelector('.task-box strong');
  const totalCells = 6;

  const targetNumber = Math.floor(Math.random() * 900) + 100;
  taskText.textContent = targetNumber;

  const numbers = Array.from({ length: totalCells - 1 }, () => Math.floor(Math.random() * 900) + 100);
  const correctIndex = Math.floor(Math.random() * totalCells);
  numbers.splice(correctIndex, 0, targetNumber);

  const colors = [
    '#f97316', '#a78bfa', '#8b5cf6', '#4ade80', '#45c2f4', '#3cb4ec'
  ];

  grid.innerHTML = '';

  numbers.forEach((num, index) => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.textContent = num;
    
    div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    div.style.opacity = Math.random() < 0.5 ? '0.5' : '1';

    if (Math.random() < 0.3) {
      div.style.animation = 'float 1.5s ease-in-out infinite';
    }

    div.addEventListener('click', () => {
      if (num === targetNumber) {
        alert('Правильно!');
        startGameRound();
      } else {
        alert('Неправильно!');
      }
    });

    grid.appendChild(div);
  });

}

const style = document.createElement('style');
style.textContent = `
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}`;
document.head.appendChild(style);

const originalCountdownHandler = () => {
  document.querySelector('#rules-screen').style.display = 'none';
  document.querySelector('#countdown-screen').style.display = 'flex';

  let count = 3;
  const countdownNumber = document.getElementById('countdown-number');
  countdownNumber.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
      countdownNumber.classList.remove('pop');
      void countdownNumber.offsetWidth;
      countdownNumber.classList.add('pop');
    } else {
      clearInterval(countdownInterval);
      document.querySelector('#countdown-screen').style.display = 'none';
      document.querySelector('#rules-screen').style.display = 'block';
      startGameRound();
    }
  }, 1000);
};

const rulesScreen = document.querySelector('#rules-screen');
rulesScreen.removeEventListener('click', () => {});
rulesScreen.addEventListener('click', originalCountdownHandler);
  
