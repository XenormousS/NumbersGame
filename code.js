document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("nextBtn");
  const introScreen = document.getElementById("intro-screen");
  const rulesScreen = document.getElementById("rules-screen");

  if (nextBtn && introScreen) {
    nextBtn.addEventListener("click", function () {
      introScreen.style.display = "none";
      rulesScreen.style.display = "block";
    });
  } else {
    console.error("Элемент не найден: проверь id в HTML");
  }
});
  
