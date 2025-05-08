'use strict'; // Aktiverer "strict" tilstand, som hjælper med at fange fejl og forhindrer brug af udefinerede variabler.

// Henter HTML-elementer fra dokumentet og gemmer dem i variabler
const startScreen = document.getElementById('startScreen'); // Startskærmen 
const quizScreen = document.getElementById('quizScreen');   // Quizskærmen 
const startBtn = document.getElementById('startBtn');       // "Start testen"-knappen
const feedback = document.querySelectorAll('.feedback');    // Alle feedback-beskeder
const btns = document.querySelectorAll('.interaction-area .btn-scenario'); // Svar-knapperne
const scenarioDescription = document.getElementById('scenarioDescription'); // Første scenarie
const scenario2Description = document.getElementById('scenario2Description'); // Andet scenarie
const scenario3Description = document.getElementById('scenario3Description'); // Tredje scenarie
const restartBtn = document.getElementById('restartBtn');   // "Tag testen igen"-knappen
const interaction = document.getElementById('interaction'); // Området hvor quiz foregår

// Når brugeren klikker på start-knappen:
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden'); // Skjul startskærmen ved at tilføje class "hidden"
  quizScreen.classList.remove('hidden'); // Vis quizskærmen ved at fjerne class "hidden"
  interaction.style.display = 'flex'; // Sørg for at interaktionsområdet vises

  // Gør alle svar-knapper synlige og skjuler restart-knappen
  btns.forEach(btn => {
    btn.style.display = 'inline-block';
    restartBtn.style.display = 'none'; 
  });
});

// Funktion til at håndtere brugerens valg (hvilken knap de klikker på)
const checkAnswer = (e) => {
  const choiceId = e.target.id; // ID'et på knappen der blev klikket
  const userAnswer = e.target.textContent; // Teksten på det valgte svar

  // Gem brugerens valg i browserens localStorage
  localStorage.setItem('userAnswer', userAnswer); //Brugerens text svar bliver gemt i localStorage så de kan se hvad de har valgt i console.
  localStorage.setItem('lastChoice', choiceId); //Her sættes lastChoice til at være choiceId fra switchen, hvilket bliver brugt til sidst til at recalle hvor brugeren var nået til i quizzen hvis de forlader siden.
  console.log('Brugerens svar var:', userAnswer); // Udskriv brugerens seneste svar i console.
  
  // Nulstil visning: Skjul feedback og alle scenarier - bruges bl.a. for at sikre at elementer ikke bliver vist efter en genstart af testen.
  feedback.forEach(box => box.style.display = 'none');
  scenarioDescription.style.display = 'none';
  scenario2Description.style.display = 'none';
  scenario3Description.style.display = 'none';
  btns.forEach(btn => btn.style.display = 'none');

  // Bestem hvilket scenarie eller hvilken feedback der skal vises
  switch (choiceId) {
    case 'c1':
      document.querySelector('#c1-f').style.display = 'flex'; // Vis feedback for korrekt svar
      restartBtn.style.display = 'block'; // Vis "Tag testen igen"-knappen
      localStorage.clear(); // Ryd localStorage for at forhindre uønsket redirect ved refresh
      console.log('LocalStorage ryddet'); // Debug-information
      break;
    case 'c2':
      scenario2Description.style.display = 'flex'; // Vis næste trin i scenariet
      document.getElementById('c4').style.display = 'block'; // Vis svarmulighed
      document.getElementById('c5').style.display = 'block'; // Vis svarmulighed
      break;
    case 'c3':
      scenario3Description.style.display = 'flex'; // Vis tredje scenarie
      document.getElementById('c6').style.display = 'block'; // Vis svarmulighed
      document.getElementById('c7').style.display = 'block'; // Vis svarmulighed
      break;
      //Hvis svaret er nogle af de følgende viser den tilsvarende feedback.
    case 'c4':
    case 'c5':
    case 'c6':
    case 'c7':
      document.querySelector(`#${choiceId}-f`).style.display = 'flex'; // Vis korrekt feedback til valget
      restartBtn.style.display = 'block'; // Giv mulighed for at tage testen igen
      localStorage.clear(); // Fjern tidligere valg fra localStorage
      console.log('LocalStorage ryddet'); // Debug-information
      break;
    default:
      console.log("Ugyldigt valg"); // En default der bruges hvis der opstår fejl med ID'er. God at have med generelt, især hvis man senere tilføjer flere scenarier.
  }
};

// Tilføj klik-funktionalitet til hver af de syv svar-knapper
['c1','c2','c3','c4','c5','c6','c7'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', checkAnswer); // Knap aktiveres til at køre checkAnswer
});

// Når brugeren klikker på "Tag testen igen"-knappen:
restartBtn.addEventListener('click', () => {
  quizScreen.classList.add('hidden'); // Skjul quiz-skærmen
  startScreen.classList.remove('hidden'); // Vis startskærmen

  // Skjul alle feedbacks
  feedback.forEach(box => box.style.display = 'none'); //Sikrer at feedback ikke bliver skjulet i tilfælde af at man gentager testen.
  restartBtn.style.display = 'none'; // Skjul "Tag testen igen"-knappen

  // Genskab startscenariet
  scenarioDescription.style.display = 'flex';
  scenario2Description.style.display = 'none';
  scenario3Description.style.display = 'none';
});

// Når siden indlæses, skjules al feedback
feedback.forEach(box => box.style.display = 'none');

// Tjek om brugeren tidligere har valgt noget, og genskab det
document.addEventListener('DOMContentLoaded', () => {
  const lastChoice = localStorage.getItem('lastChoice'); // Her gøres last choice til en constant variabel
  if (lastChoice) {
    const btn = document.getElementById(lastChoice); // Find knappen
    if (btn) {
      // Simuler klik på den gemte knap for at tage brugeren til hvor de nåede til.
      checkAnswer({ target: btn });
    }
  }
});
