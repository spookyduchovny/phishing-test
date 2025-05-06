'use strict';

// HTML-elementer
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const startBtn = document.getElementById('startBtn');
const feedback = document.querySelectorAll('.feedback');
const btns = document.querySelectorAll('.interaction-area .btn-scenario');
const additionalChoices = document.getElementById('additionalChoices');
const scenarioDescription = document.getElementById('scenarioDescription');
const scenario2Description = document.getElementById('scenario2Description');
const scenario3Description = document.getElementById('scenario3Description');

// Start knap event listener
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');

  // Show the scenario buttons (c1, c2, c3)
  btns.forEach(btn => {
      btn.style.display = 'inline-block'; // Show main buttons
      restartBtn.style.display = 'none'; // Hide the restart button
  });
});


// Håndter scenario
const checkAnswer = (e) => {
    // Hide all feedback boxes
    feedback.forEach(box => {
        box.style.display = 'none'; // Hide feedback
    });

    // Hide all main buttons
    btns.forEach(btn => {
        btn.style.display = 'none'; // Hide main buttons
    });

    // Hide the original scenario description
    scenarioDescription.style.display = 'none'; // Hide original scenario description

    // Show feedback or additional choices based on the button clicked
    switch (e.target.id) {
        case 'c1':
          case 'c1':
            document.querySelector('#c1-f').style.display = 'block'; // Show feedback for Scenario 1
            restartBtn.style.display = 'block'; // Show the restart button (added this line)
            break;
        case 'c2':
            scenario2Description.style.display = 'block'; // Show Scenario 2 description
            additionalChoices.style.display = 'block'; // Show additional choices
            document.getElementById('c4').style.display = 'block'; // Show Choice 4
            document.getElementById('c5').style.display = 'block'; // Show Choice 5
            break;
        case 'c3':
            scenario3Description.style.display = 'block'; // Show Scenario 3 description
            additionalChoices.style.display = 'block'; // Show additional choices
            document.getElementById('c6').style.display = 'block'; // Show Choice 6
            document.getElementById('c7').style.display = 'block'; // Show Choice 7
            break;
        default:
            console.log("Error: Ugyldigt valg!"); // Log error if the ID does not match
            break;
    }
};

// Add event listeners to the main scenario buttons
btns.forEach(btn => {
    btn.addEventListener('click', checkAnswer);
});

// Handle additional choices for Scenario 2 and 3
const handleChoiceFeedback = (choiceId) => {
  feedback.forEach(box => {
      box.style.display = 'none'; // Hide all feedback
  });
  document.querySelector(`#${choiceId}-f`).style.display = 'block'; // Show feedback for the selected choice
  restartBtn.style.display = 'block'; // Show the restart button
  additionalChoices.style.display = 'none'; // Hide additional choices
  scenario2Description.style.display = 'none'; // Hide Scenario 2 description if it was shown
  scenario3Description.style.display = 'none'; // Hide Scenario 3 description if it was shown
};

// Event listeners for additional choices
document.getElementById('c4').addEventListener('click', () => handleChoiceFeedback('c4'));
document.getElementById('c5').addEventListener('click', () => handleChoiceFeedback('c5'));
document.getElementById('c6').addEventListener('click', () => handleChoiceFeedback('c6'));
document.getElementById('c7').addEventListener('click', () => handleChoiceFeedback('c7'));

// Restart the quiz
restartBtn.addEventListener('click', () => {
  // Hide the quiz screen and show the start screen
  quizScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');

  // Reset all elements to their initial state
  feedback.forEach(box => {
      box.style.display = 'none'; // Hide all feedback
  });

  // Hide the restart button
  restartBtn.style.display = 'none'; // Ensure this line is executed

  // Reset scenario descriptions and buttons
  scenarioDescription.style.display = 'block'; // Show original scenario description
  additionalChoices.style.display = 'none'; // Hide additional choices

  // Show only the start button
  startBtn.style.display = 'inline-block'; // Show the start button
});

// Ensure that the feedback elements are hidden initially
feedback.forEach(box => {
    box.style.display = 'none'; // Hide all feedback elements on page load
});