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
}

// fetch('/questions.json')
//   .then(response => Response.json())
//   .then(data => {
//     const question = data.quiz[0].vraag;
//     document.getElementById('questionText').textContent = question;
//   })
//   .catch(error => {
//     console.error('Error loading question: ', error);
//   });

function loadQuizQuestion(index = 0) {
  fetch('/questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Kan JSON niet laden');
    }
    return response.json();
  })
  .then(data => {
    const vraag = data.quiz[index.vraag];
    const opties = data.quiz[index].opties;

    document.getElementById('questionText').textContent = vraag;
    document.getElementById('answer1').textContent = opties[0];
    document.getElementById('answer2').textContent = opties[1];
    document.getElementById('answer3').textContent = opties[2];
    document.getElementById('answer3').textContent = opties[3];
  })
  .catch(error => {
    console.error('Fout bij het laden van de quiz: ', error);
  })
}
function goToWelcomePage() {
  stopTimer();
  // Verberg alle pagina's behalve page1
  document.getElementById('page1').classList.remove('hidden');
  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.add('hidden');
  document.getElementById('page4').classList.add('hidden');
  document.getElementById('page5').classList.add('hidden');
}