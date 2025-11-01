let timerInterval;
let currentQuestion = 0;
let score = 0;
let allQuestions = {};
let userAnswers = [];
let currentQuiz = "";
let currentPageId = "";
let currentTimerId = "";

// Laad de JSON met alle quizvragen
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    allQuestions = data;
  })
  .catch(error => console.error('Error loading questions:', error));

// Timer functie
function startTimer(duration, displayId, onTimeUp) {
  let timer = duration;
  const display = document.getElementById(displayId);
  display.textContent = `Tijd: ${timer}s`;

  timerInterval = setInterval(() => {
    timer--;
    display.textContent = `Tijd: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      display.textContent = "Tijd is op!";
      if (onTimeUp) onTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showQuestion(quizName, pageId, timerId) {
  const questions = allQuestions[quizName];
  if (!questions || currentQuestion >= questions.length) {
    showResults(quizName, questions);
    return;
  }
  const vraagObj = questions[currentQuestion];
  const page = document.getElementById(pageId);
  const h2 = page.querySelector('h2');
  h2.textContent = vraagObj.vraag;
  const btns = page.querySelectorAll('button[id^="answer"]');
  btns.forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = 1;
  });
  vraagObj.opties.forEach((optie, i) => {
    const btn = btns[i];
    btn.textContent = optie;
    btn.onclick = () => {
      stopTimer();
      const juist = i === vraagObj.antwoord;
      if (juist) score++;
      userAnswers.push({
        vraag: vraagObj.vraag,
        gegeven: optie,
        juist: juist,
        correctAntwoord: vraagObj.opties[vraagObj.antwoord]
      });
      currentQuestion++;
      showQuestion(quizName, pageId, timerId);
    };
  });
  // Disable niet-gebruikte knoppen
  for (let i = vraagObj.opties.length; i < btns.length; i++) {
    btns[i].textContent = "";
    btns[i].disabled = true;
    btns[i].style.opacity = 0.5;
  }
  startTimer(15, timerId, () => {
    // Tijd is op, knoppen uitschakelen
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      btns[i].style.opacity = 0.5;
    }
    userAnswers.push({
      vraag: vraagObj.vraag,
      gegeven: "Geen antwoord",
      juist: false,
      correctAntwoord: vraagObj.opties[vraagObj.antwoord]
    });
    setTimeout(() => {
      currentQuestion++;
      showQuestion(quizName, pageId, timerId);
    }, 1000);
  });
}

function showResults(quizName, questions) {
  // Hide quiz pages
  document.getElementById('page3').classList.add('hidden');
  document.getElementById('page4').classList.add('hidden');
  document.getElementById('page5').classList.add('hidden');

  // Show result page
  document.getElementById('resultPage').classList.remove('hidden');

  // Display score
  document.getElementById('scoreText').textContent = `Je score: ${score} / ${questions.length}`;

  // Render detailed answer review
  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = "";
  userAnswers.forEach((antwoord, idx) => {
    const li = document.createElement('li');
    li.className = "mb-2";
    li.innerHTML = `<strong>Vraag ${idx + 1}:</strong> ${antwoord.vraag}<br>
      <span style="color:${antwoord.juist ? 'green' : 'red'}">
        Jouw antwoord: ${antwoord.gegeven}
        ${antwoord.juist ? '✔️' : `❌ (Correct: ${antwoord.correctAntwoord})`}
      </span>`;
    resultsList.appendChild(li);
  });

  // Save score to leaderboard
  const name = document.getElementById('saveName').value.trim();
  if (name !== "") {
    saveToLeaderboard(name, score);
  }

  // Render leaderboard
  renderLeaderboard();
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
  score = 0;
  currentQuestion = 0;
  userAnswers = [];
  currentQuiz = "quiz";
  currentPageId = "page3";
  currentTimerId = "timer3";

  updatePlayerNameDisplay();
  
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.remove('hidden');
  document.getElementById('resultPage').classList.add('hidden');
  showQuestion(currentQuiz, currentPageId, currentTimerId);
}

function goToQuiz2() {
  stopTimer();
  score = 0;
  currentQuestion = 0;
  userAnswers = [];
  currentQuiz = "quiz2";
  currentPageId = "page4";
  currentTimerId = "timer4";

  updatePlayerNameDisplay();
  
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page4').classList.remove('hidden');
  document.getElementById('resultPage').classList.add('hidden');
  showQuestion(currentQuiz, currentPageId, currentTimerId);
}

function goToQuiz3() {
  stopTimer();
  score = 0;
  currentQuestion = 0;
  userAnswers = [];
  currentQuiz = "quiz3";
  currentPageId = "page5";
  currentTimerId = "timer5";

  updatePlayerNameDisplay();

  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page5').classList.remove('hidden');
  document.getElementById('resultPage').classList.add('hidden');
  showQuestion(currentQuiz, currentPageId, currentTimerId);
}

function goToWelcomePage() {
  stopTimer();
  document.getElementById('page1').classList.remove('hidden');
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.add('hidden');
  document.getElementById('page4').classList.add('hidden');
  document.getElementById('page5').classList.add('hidden');
  document.getElementById('resultPage').classList.add('hidden');
}

// Enter op naamveld = submit
document.getElementById('saveName').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    goToThemePage();
  }
});

function saveToLeaderboard(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score); // Highest score first
  leaderboard.splice(10); // Keep top 10
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function renderLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const list = document.getElementById('leaderboardList');
  list.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    li.className = "flex justify-between bg-white px-4 py-2 rounded shadow-sm hover:bg-gray-100";
    li.innerHTML = `<span class="font-medium">${index + 1}. ${entry.name}</span>
                    <span class="text-blue-600 font-bold">${entry.score}</span>`;
    list.appendChild(li);
  });
}

function clearLeaderboard() {
  localStorage.removeItem('leaderboard');
  renderLeaderboard();
}

function updatePlayerNameDisplay() {
  const name = document.getElementById('saveName').value.trim();
  document.getElementById('userName').textContent = name;
  const playerNameEl = document.getElementById('playerName');
  if (playerNameEl) {
    playerNameEl.innerHTML = `Speler: <span class="font-semibold">${name}</span>`;
  }
}
