function goToThemePage() {
  const name = document.getElementById('saveName').value.trim();
  if (name === " ") {
    alert("Vul je naam in!");
    return;
  }

  document.getElementById('userName').textContent = name;

  document.getElementById('page1').classList.add('hidden');
  document.getElementById('page2').classList.remove('hidden');
}

function goToQuiz1() {
  const name = document.getElementById('quiz1').value.trim();

  document.getElementById('userName').textContent = name;

  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page3').classList.remove('hidden');
}

function goToQuiz2() {
  const name = document.getElementById('quiz2').value.trim();

  document.getElementById('userName').textContent = name;

  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page4').classList.remove('hidden');
}

function goToQuiz3() {
  const name = document.getElementById('quiz3').value.trim();

  document.getElementById('userName').textContent = name;

  document.getElementById('page2').classList.add('hidden');
  document.getElementById('page5').classList.remove('hidden');
}