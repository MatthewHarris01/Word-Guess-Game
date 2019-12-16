/*This is the JS code for the Word-Guess game */

var isHint = false; //whether or not the hint div is visible.

  // Gobal variables
  var isSpinning = false;  // a game is not happening now

  var userGuesses = "";        //a string containing all of the letters the use has tried, so far
  var userWins = 0;           //the number of wins the user has had in this play session
  var userGuessRemaining = 26; //the number of guesses remaining to the user, always starts at 26
  var compWord = "";           //the word the computer picked for the user to guess.
  var cmpWordBlank = "";  //THE STRING OF THE WORD WHEN COMPLETELY BLANK
 // var indexes = []; //array to hold indexes of matched letters

  //list of words from which computer will select a word (17 total)
  var wordList = ["ROCKET", "LOX", "CAPSULE", "GEMINI", "MERCURY", "APOLLO", "SHUTTLE", "BALLISTIC", "SPACECRAFT", "COUNTDOWN",
    "VOYAGER", "SATELLITE", "SPUTNIK", "ORBITAL", "SUBORBITAL", "FREEFALL", "ACCELERATION"];


  //list of letters in the alphabet, used to screen user input.
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


function showHint() {
  //this function shows the list of possible words to the user, at a cost of half the player's remaining tries
  if (isHint == true) {
    alert("The hint box is already visible!");
    return;
  }
  var cont = confirm("Showing hints will cost HALF of your remaining guesses!! AND your win score will be reduced by 1.<br> Are you sure you want to show hints?")

  if (cont==true) { 
    console.log("show hints");
    isHint=true;  //the hint box is now visible
    //PENALTIES for seeking a hint
    userGuessRemaining = Math.floor(userGuessRemaining/2)
    userWins = userWins -1;

    var tmp ="The computer is asking you to guess one of the following words. <br>(this hint list will be hidden after your next letter guess!) <br>";
    for (i=0; i<wordList.length; i++) {
      //make hintbox visible
      document.getElementById("hintbox").style.visibility="visible";


      //assemble the hint string
      tmp += wordList[i] + "<br>";
    }
    document.getElementById("hintlist").innerHTML = tmp;
  }
  else {
    console.log("DON'T show hints");
  }
  tmp += "<br> This hint list will disappear after you next letter guess!"
  
} //end funtion showHint


$(document).ready(function () {
  // console.log("inside document is ready function");



  function isValid(letter) {
    //this function validates that "letter" is a letter of the alphabet
    var rslt = false; //assume failure
    // console.log("in isValid function");
    letter = letter.toLowerCase();
    // console.log("letter argument: " + letter);
    if (letter.length > 1) {
      //letter length is greater than 1, not valid
      return rslt;
    }
    else {
      for (i = 0; i <= alphabet.length; i++) {
        if (letter == alphabet[i]) {
          //we found what we were looking for
          rslt = true;
        }

    }
    return rslt;

  }
  } //end of IsValid function

  function initGame() {
    // console.log("initialize the game");
    //this functions resets the game and onscreen elements ready to start a new word
    //RESET VARIABLES 
    userGuesses = ""  //reset user guesses to empty string
    //note userWins should not be reset, as that is the total number of wins for the entire session
    if (isHint != true) {
    userGuessRemaining = 26;  //user gets a total of 26 guesses each word.
    }
    compWord = cmpPickWord(); //pick a word from the array of words.
    cmpWordBlank = formatUnGuessed(compWord);
    // console.log("computer word is '" + compWord + "'");
    //change the content of h1 with id="PROMPT1" to show that play is in progress -- no that is done in updateDisplay
    // var E = document.getElementById("PROMPT1").innerText = "GAME IS IN PROGRESS";
    // E.innertext = cmpword; // for testng only
    //display info
    //set game in progress flag to true;
    updateDisplay();
    // isSpinning = true;  //set flag that game is in progress
  } //end of initGame function

  function updateDisplay() {
    //display apprpriate page title
    // console.log("in updateDisplay function");
    if (isSpinning != true) {
      document.getElementById("PROMPT1").innerText = "PRESS ANY KEY TO START";
    }
    else {
      document.getElementById("PROMPT1").innerText = "GAME IS IN PROGRESS";
    }
    // display unguessed word (blanks);
    document.getElementById("cmpword").innerText = cmpWordBlank;
    //display remaining tries
    document.getElementById("guessesremaining2").innerText = userGuessRemaining;;

    //display letters guessed so far
    if (userGuesses.length == 0) {
      document.getElementById("guesses").innerText = "None" //no guesses made yet
    }
    else {
      document.getElementById("guesses").innerText = userGuesses; //display string of user guesses
    }

    //display remaining tries
    document.getElementById("guessesremaining2").innerText = userGuessRemaining;

    //display wins
    document.getElementById("wins").innerText = userWins;
    // console.log("end of update display");

  }  //end of updateDisplay function

  function formatUnGuessed(wrd) {
    //this function formats the unguessed word for display, passed as the paramter "wrd"
    //if the string of user guesses is empty, then format the whole string
    //if not, then have to check which of the user guesses are in the computer's word.
    // console.log("format unguessed word");
    var tmp = "";
    // console.log("in formatting function");
    // console.log("wrd argument is: " + wrd);
    // console.log("format computer word completely blank");
    if (userGuesses == "") {
      for (i = 0; i < wrd.length; i++) {
        tmp += "_ ";
        // console.log(wrd[i]);
        // console.log("tmp :" + tmp);
      }
    }
    else {
      // console.log("must call the fomrWordWithGuess function to re-format the cmpWordBlank variable content");
      // console.log("current guesses are:");
      // console.log(userGuesses);
      tmp = formatWordWithGuesses;
    }

      // console.log("result before returning from formatunguessedWord function");
      // console.log("'" + tmp + "'");
      // console.log("end of formatUnGuessed word function");
      return tmp;
  }  //end of formatGuessed function

  function formatWordWithGuesses(wrd) {
    //this function presumes there are some guesses, and formats a string for the display, based on the cmbWordBlan variable contents
    // console.log("IN FUNCTION formatWordWithGuesses");

    // console.log("blank word below: ");
    // console.log(cmpWordBlank);

    if (userGuesses != "") {    
    //make the blank format into an array of chars
    var cmpWordBlankar = cmpWordBlank.split("");
    // console.log("array from blank string below:")
    // console.log(cmpWordBlankar);

      //loop through letters of computer word
      // console.log("looping through computer's word: " + compWord);
      for ( var i = 0; i < compWord.length; i++) {
          // console.log("outer loop count: " + i);
          var s = compWord.charAt(i);
          // console.log("word letter: " + s);
          // console.log("current word letter: " + s + " at position " + i);
          // console.log(compWord.charAt[i]);
          // console.log("loop through user guesses");
          for (k = 0; k < userGuesses.length; k++) {
            var s1 = userGuesses.charAt(k);
            if (s === s1) {
              cmpWordBlankar[i*2] = s;
            }            
          }  //end of inner loop
      }  //end of outer loop
      var s2 = convertA2String(cmpWordBlankar); //convert the array into a string
      updateDisplay();  //update display here, so maybe the final letter user guesses for win will be displayed
      return s2;
    }
    }  //end formatWordWithGuesses function


  function testUserWin () {
    //this functon tests whether the user has won the game.
    var tmp =""
    //remove spaces from the "blank" word
    tmp = cmpWordBlank.replace(/ /g,"" );

    //compare the spaceless "blank" word witht he computer guess, if they are equal, the user has won.
  if (tmp == compWord ) {
    // console.log("USER HAS WON!");
    updateDisplay();  //update the display after final letter guess, but fnal letter gues is till no being displayed.
    document.getElementById("cmpword").innerText = cmpWordBlank;

    playerWin();
    userWins += 1;
    isSpinning=false;  //we're not playing at this point
    document.getElementById("youWin").play;  //try playing the I win sound from here.
    initGame();  //re-initialize game for a new round
  }
  else {
    //not a win yet. not work here
  }
  }  //end testUserWin function


  function cmpPickWord() {
    // console.log('computer picks random word from list');
    var idx = 0;
    //generate a random number from 0 to 16
    idx = Math.floor(Math.random() * 17);
    // console.log(idx);
    // console.log("word index: " + idx);
    // console.log("picked word: " + wordList[idx]);
    return wordList[idx];
  }  //end of cmpPickWord function

  function playerLoss() { //NOT WORKING,NOT SURE WHY -- sound does not play.
    //player has lost the game
    // console.log("playerLoss function");
    document.getElementById("youLose").play;
    alert("you lose! The computer's word was: " + compWord);
    isSpinning = false;
    initGame();
  }

  function playerWin() { //AUDIO NOT WORKING, NOT SURE WHY -- sound does not play.
    //player has won the game
    document.getElementById("youWin").play; 
    alert("You WIN!" + " The computer's word was: " + compWord);
  }



function convertA2String(ar) {
  //this function asembles a string from the contents of the arRay parameter "ar", this avoids the commas introduced to the string result
  //by using the toString method.
  var tmp = "" //temp string to hold interim results
  for (i =0; i < ar.length; i++) {
    tmp += ar[i];
  }
  return tmp;
}

  //**testing code goes here -- to avoid having to play the entire game to test various functions
  // console.log("TESTING MODE");

      

      // console.log("END OF TEST");
  // return; //end document.ready function without doing more work


  // Game code here...

  //THIS IS THE START OF THE KEY EVENT HANDLER, THE MAJORITY OF THE GAME ACTION OCCURS IN THIS FUNCTION
  // console.log(" on key up event-handler");
  document.onkeyup = function (event) {
    var input = event.key.toUpperCase();

    //check whether game is already in progress
    if (isSpinning !== true) {
      //game is not yet in progress, intialize the game
      // console.log("game has not started");
      initGame();
      isSpinning = true;  //only mark game in progress here
      updateDisplay();  //refresh the display
    }
    else if (isValid(input)) {
      //user has pressed a valid letter key
      // console.log("user pressed valid letter: " + input);
      //add user guess to string of user guesses
      //hide the hintbox if it is visible
      if (isHint == true) {
        document.getElementById("hintbox").style.visibility = "hidden";
        isHint = false;
      }
      userGuesses += input;
      //check if the user guess is in the current word
      cmpWordBlank = formatWordWithGuesses();
      // console.log("new blank word: " + cmpWordBlank);
      //decrement guesses remaining
      userGuessRemaining = userGuessRemaining - 1;
      if (userGuessRemaining <= 0) {
        //player is out of guesses!
        playerLoss(); //player loses game
      }

      //update the screen display
      // console.log("update screen display");
      updateDisplay();

      //determine if player has won the game
      //game is won iF the current formatted word with guesses (after removing spaces)is the same as the word the computer guessd.
      testUserWin();
    } //end if is valid user input;
    else {
      //invalid input
      alert("you must press one of the letter keys a-z!!");
    }
  }  //end of onkeyup event function
}) //end of document ready function