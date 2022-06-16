/* 
GAME FUCTION:
- Player must guess a number between given numbers
- Player gets certain amount of guesses (lifes)
- Notify lifes remaining
- Give the right answer if loose
- Let choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRanNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event
game.addEventListener('mousedown', function(e){
   if(e.target.classList.contains('play-again')){
      window.location.reload();
   }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);
   
   //Validate input
   if (isNaN(guess) || guess < min || guess > max) {
      guessInput.value = '';
      setMessage(`Please insert a number between ${min} and ${max}`, 'red');
      return
   }

   //Check if won
   if (guess === winningNum) {
      gameOver(true, `${winningNum} is correct! You WIN!!`);
      guessInput.value = '';
   } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
         guessInput.value = '';
         // Gameover
         gameOver(false, `GAME OVER. The correct number was ${winningNum}`);
      } else {
         //Change border color
         guessInput.style.borderColor = 'red';

         setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');

         //Clear input
         guessInput.value = '';
      }
   }
});

//Game over
function gameOver(won, msg) {
   let color;
   won === true ? color = 'green' : color = 'red';

   //Disable input
   guessInput.disabled = true;
   //Change border color
   guessInput.style.borderColor = color;
   //Set text color
   message.style.color = color;
   //Won message
   setMessage(msg);

   //Play again
   guessBtn.value = 'Play again';
   guessBtn.className += ' play-again';
}

//Get winning number
function getRanNum() {
   return (Math.floor(Math.random()*(max-min+1)+min));
}

//Set message function
function setMessage(msg, color){
   message.style.color = color;
   message.textContent = msg;
}
