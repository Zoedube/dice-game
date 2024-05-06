// Declaring the fundamental game variables
let scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

// Initilizing the game 
init();

// Adding an event listener to the button that makes the dice roll (using an anonymous function)
document.querySelector('.btn-roll').addEventListener('click', function () {

  // Checking if the game is being played
  if (gamePlaying) {

    // Create two random numbers for the dices
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the results
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice' + dice2 + '.png';
    
    // Checking if the player rolls a 6 two times in a row
    if(dice1 === 6 && prevDiceRoll === 6) {
        // Player looses his entire score
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    // Update the round score if the rolled number was not a 1 
    } else if (dice1 !== 1 && dice2 !== 1) {
        // Add score if the dice number is different from 1
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // Next player's turn  
        nextPlayer();
    }

    // Saving the previous dice roll on a variable 
    prevDiceRoll = dice1;

  }

});

// Functionality that allows to accumulate points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    // Adding the current score to the global score
    scores[activePlayer] += roundScore;

    // Updating the UI (user interface) 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Checking if the winning score is the predefined of 100 or if an user has set a specific goal 
    // Saving the final score input in a variable 
    let input = document.getElementById('winningScore').value;
    let winningScore;

    // Undefined, 0, null or "" are coerced to false, anything else is coerced to true
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Checking if the player won the game
    if (scores[activePlayer] >= winningScore) {

      // Changing the name of the player to 'Winner!'
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      // Hiding the dices
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';

      // Adding the 'winner' class to the player
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      // Removing the active player status from the winner 
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      // Changing the 'gamePlaying' variable to 'false' 
      gamePlaying = false;

    } else {
      // If the player wins the game, then it's the next player's turn
      nextPlayer();
    }
  }
});

// Restarting the game after clicking the 'New Game' button 
document.querySelector('.btn-new').addEventListener('click', init);

// Function that initializes the game
function init() {

  // Setting the 'gamePlaying' variable to 'true' 
  gamePlaying = true;

  // Setting both scores back to 0
  scores = [0, 0];

  // Setting the activePlayer back to being 'Player 1'
  activePlayer = 0;

  // Setting the roundScore back to 0
  roundScore = 0;

  // Hiding the dices right from the beggining of the game
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

  // Setting the scores to 0 by default (using the 'getElementById' method)
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Removing the 'winner status' from the winning player
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Removing the 'active status' from the winning player 
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'  
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

// Function to giving the turn to the next player
function nextPlayer() {

  // It's the next player's turn if the dice number is 1 (using the ternary operator)
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Setting the roundScore back to 0
  roundScore = 0;

  // Setting the current score back to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Adding the active class to the player who has the turn now
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hiding the dice after the active player changes 
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

}
// Code for game instructions
document.querySelector('.settings-icon').addEventListener('click', function() {
  document.querySelector('.instruction-card').classList.remove('hidden');
});

// Code to close the game instructions
document.querySelector('.close-btn').addEventListener('click', function() {
  document.querySelector('.instruction-card').classList.add('hidden');
});

// Game sound code
let backgroundMusic = document.getElementById('background-music');

// Add event listener to the sound icon
document.querySelector('.sound-icon').addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        document.querySelector('.sound-icon i').classList.remove('ri-volume-mute-line');
        document.querySelector('.sound-icon i').classList.add('ri-volume-up-line');
    } else {
        backgroundMusic.pause();
        document.querySelector('.sound-icon i').classList.remove('ri-volume-up-line');
        document.querySelector('.sound-icon i').classList.add('ri-volume-mute-line');
    }
});

let playerNames = ['', '']; // Array to store player names

function editNames() {
    // Prompt both players to enter their names
    for (let i = 0; i < 2; i++) {
        let name = prompt("Enter Player " + (i + 1) + "'s Name:");
        
        // Validate if the input is a string and does not contain special characters or numbers
        if (/[^a-zA-Z\s]/.test(name) || /\d/.test(name)) {
            // If the input contains special characters or numbers, display an error message
            alert("Please enter a valid name (only letters and spaces) for Player " + (i + 1) + "!");
            return; // Exit the function if the input is invalid
        } else if (name.trim() === "") {
            // If the input is empty, display an error message
            alert("Please enter a name for Player " + (i + 1) + "!");
            return; // Exit the function if the input is invalid
        } else {
            // Store the player's name in the array
            playerNames[i] = name;

            // Update the text content of the player name button with the entered name
            document.getElementById('name-' + i).textContent = name;
        }
    }

    // Display a message confirming both players' names
    alert("Player 1: " + playerNames[0] + "\nPlayer 2: " + playerNames[1]);
}



// Function to display the winner of the game
function displayWinner(player) {
  // Changing the name of the winning player to 'Winner!'
  document.querySelector('#name-' + player).textContent = 'Winner!';

  // Hiding the dices
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

  // Adding the 'winner' class to the winning player's panel
  document.querySelector('.player-' + player + '-panel').classList.add('winner');

  // Removing the 'active' class from the winning player's panel
  document.querySelector('.player-' + player + '-panel').classList.remove('active');

  // Setting 'gamePlaying' to 'false' to stop the game
  gamePlaying = false;
}

// Checking if the player won the game
if (scores[activePlayer] >= winningScore) {
  // Calling the displayWinner function with the winning player as an argument
  displayWinner(activePlayer);
} else {
  // If the player hasn't won yet, proceed with the next player's turn
  nextPlayer();
}

