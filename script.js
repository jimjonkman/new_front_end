let timerInterval;
let currentQuestion = 0;
let score = 0;
let allQuestions = {};

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
// ...boven je showQuestion functie...

function showQuestion(quizName, pageId, timerId) {
  const questions = allQuestions[quizName];
  if (!questions || currentQuestion >= questions.length) {
    alert(`Quiz klaar! Je score: ${score}/${questions ? questions.length : 0}`);
    goToWelcomePage();
    return;
  }
  const vraagObj = questions[currentQuestion];
  // Zoek de juiste h2 binnen de pagina
  const page = document.getElementById(pageId);
  const h2 = page.querySelector('h2');
  h2.textContent = vraagObj.vraag;
  // Zoek alleen de knoppen binnen de juiste pagina!
  const btns = page.querySelectorAll('button[id^="answer"]');
  vraagObj.opties.forEach((optie, i) => {
    const btn = btns[i];
    btn.textContent = optie;
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.onclick = () => {
      stopTimer();
      if (i === vraagObj.antwoord) score++;
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
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      btns[i].style.opacity = 0.5;
    }
    setTimeout(() => {
      currentQuestion++;
      showQuestion(quizName, pageId, timerId);
    }, 1000);
  });
}

// Pagina navigatie functies
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
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.remove('hidden');
  showQuestion("quiz", "page3", "timer3");
}

function goToQuiz2() {
  stopTimer();
  score = 0;
  currentQuestion = 0;
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page4').classList.remove('hidden');
  showQuestion("quiz2", "page4", "timer4");
}

function goToQuiz3() {
  stopTimer();
  score = 0;
  currentQuestion = 0;
  document.getElementById('userName').textContent = document.getElementById('saveName').value.trim();
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page5').classList.remove('hidden');
  showQuestion("quiz3", "page5", "timer5");
}

function goToWelcomePage() {
  stopTimer();
  document.getElementById('page1').classList.remove('hidden');
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.add('hidden');
  document.getElementById('page4').classList.add('hidden');
  document.getElementById('page5').classList.add('hidden');
}

// Enter op naamveld = submit
document.getElementById('saveName').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    goToThemePage();
  }
});