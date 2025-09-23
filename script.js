let timerInterval;
let currentQuestion = 0;
let quizData = [];
let selectedQuiz = "";
let score = 0;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
  })
  .catch(error => console.error('Error loading questions:', error));
  
function startTimer(duration, displayId, onTimeUp) {
  let timer = duration;
  const display = document.getElementById(displayId);
  display.textContent = `Tijd: ${timer}s`;

  timerInterval = setInterval(() => {
    timer--;
    display.textContent = `Tijd: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      display.textContent = "Tijd is over!";
      if (onTimeUp) onTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function goToThemePage() {
  const name = document.getElementById('saveName').value.trim();
  if (name === "") {
    alert("Vul je naam in!");
    return;
  }

  document.getElementById('userName').textContent = name;

  document.getElementById('page1').classList.add('hidden');
  document.getElementById('page2').classList.remove('hidden');
}

function goToQuiz1() {
  stopTimer();
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.remove('hidden');
  startTimer(15, 'timer3', () => {
    alert("Tijd is op!");
    // Hier kun je knoppen uitschakelen of automatisch verder gaan
  });
}

function goToQuiz2() {
  stopTimer();
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page4').classList.remove('hidden');
  startTimer(15, 'timer4', () => {
    alert("Tijd is op!");
  });
}

function goToQuiz3() {
  stopTimer();
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page5').classList.remove('hidden');
  startTimer(15, 'timer5', () => {
    alert("Tijd is op!");
  });
}