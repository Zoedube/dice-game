// Declaring the fundamental game variables
let scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

// Initilizing the game 
init();

// Adding an event listener to the button that makes the dice roll (using an anonymous function)
document.querySelector('.btn-roll').addEventListener('click', function () {

  // Checking if the game is being played
  if (gamePlaying) {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice' + dice2 + '.png';
    
    // Checking if the player rolls a 6 two times in a row
    if(dice1 === 6 && prevDiceRoll === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer(); 
    } else if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
    prevDiceRoll = dice1;

  }

});

// Functionality that allows to accumulate points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    // Adding the current score to the global score
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    let input = document.getElementById('winningScore').value;
    let winningScore;
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Checking if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
      gamePlaying = false;

    } else {
      nextPlayer();
    }
  }
});

// Restarting the game after clicking the 'New Game' button 
document.querySelector('.btn-new').addEventListener('click', init);

// Function that initializes the game
function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner'); 
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

// Function to giving the turn to the next player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
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

let playerNames = ['', '']; 
function editNames() {
    for (let i = 0; i < 2; i++) {
        let name = prompt("Enter Player " + (i + 1) + "'s Name:");
        if (/[^a-zA-Z\s]/.test(name) || /\d/.test(name)) {
            alert("Please enter a valid name (only letters and spaces) for Player " + (i + 1) + "!");
            return;
        } else if (name.trim() === "") {
            alert("Please enter a name for Player " + (i + 1) + "!");
   return; 
            playerNames[i] = nam
            document.getElementById('name-' + i).textContent = name;
     }
    }
    alert("Player 1: " + playerNames[0] + "\nPlayer 2: " + playerNames[1]);
}



// Function to display the winner of the game
function displayWinner(player) {
  document.querySelector('#name-' + player).textContent = 'Winner!';
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  document.querySelector('.player-' + player + '-panel').classList.add('winner');
  document.querySelector('.player-' + player + '-panel').classList.remove('active');
  gamePlaying = false;
}

// Checking if the player won the game
if (scores[activePlayer] >= winningScore) {
  displayWinner(activePlayer);
} else {
  nextPlayer();
}

