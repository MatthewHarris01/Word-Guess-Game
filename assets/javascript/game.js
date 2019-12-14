/*This is the JS code for the Word-Guess game */



$(document).ready(function () {
  console.log("document is ready function");


  // Gobal variables
  var isSpinning = false;  // a gaame is not happening now

  var userGuesses = "";        //a string containing all of the letters the use has tried, so far
  var userWins = 0;           //the number of wins the user has had in this play session
  var userGuessRemaining = 0; //the number of guesses remaining to the user
  var compWord = "";           //the word the computer picked for the user to guess.
  var cmpWordBlank = "";  //THE STRING OF THE WORD WHEN COMPLETELY BLANK
 // var indexes = []; //array to hold indexes of matched letters

  //list of words from which computer will selest a word (17 total)
  var wordList = ["ROCKET", "LOX", "CAPSULE", "GEMINI", "MERCURY", "APOLLO", "SHUTTLE", "BALLISTIC", "SPACECRAFT", "COUNTDOWN",
    "VOYAGER", "SATELLITE", "SPUTNIK", "ORBITAL", "SUBORBITAL", "FREEFALL", "ACCELERATION"];


  //list of letters in the alphabet, used to screen user input.
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  function isValid(letter) {
    //this function validates that "letter" is a letter of the alphabet
    var rslt = false; //assume failure
    console.log("in isValid function");
    letter = letter.toLowerCase();
    console.log("letter argument: " + letter);
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
    console.log("initialize the game");
    //this functions resets the game and onscreen elements ready to start a new word
    isSpinning = true;  //set flag that game is in progress
    //RESET VARIABLES 
    userGuesses = ""  //reset user guesses to empty string
    //note userWins should not be reset, as that is the total number of wins for the entire session
    userGuessRemaining = 26;  //user gets a total of 26 guesses each word.
    compWord = cmpPickWord(); //pick a word from the array of words.
    cmpWordBlank = formatUnGuessed(compWord);
    console.log("computer word is '" + compWord + "'");
    //change the content of h1 with id="PROMPT1" to show that play is in progress
    var E = document.getElementById("PROMPT1").innerText = "GAME IS IN PROGRESS";
    // E.innertext = cmpword; // for testng only
    //display info
    updateDisplay();
    //set game in progress flag to true;
  }

  function updateDisplay() {
    //display apprpriate pag title
    console.log("in updateDisplay function");
    if (isSpinning != true) {
      document.getElementById("PROMPT1").innerText = "PRESS ANY KEY TO START";
    }
    else {
      document.getElementById("PROMPT1").innerText = "GAME IS IN PROGRESS";
    }
    // display unguessed word (blanks);
    document.getElementById("cmpword").innerText = // formatUnGuessed(compWord); //insert the string for the unguessed word.
    // console.log("result of formatUnGuessed '" + formatUnGuessed(compWord) + "'") //testing

    //display remaining tries
    document.getElementById("guessesremaining2").innerText = userGuessRemaining;;

    //display letters guessed so far
    if (userGuesses.length == 0) {
      document.getElementById("guesses").innerText = "None" //no guesses made yet
    }
    else {
      document.getElementById("guesses").innerText = userGuesses; //no guesses made yet
    }

    //display remaining tries
    document.getElementById("guessesremaining2").innerText = userGuessRemaining;

    //display wins
    document.getElementById("wins").innerText = userWins;

  }

  function formatUnGuessed(wrd) {
    //this function formats the unguessed word for display, passed as the paramter "wrd"
    //if the string of user guesses is empty, then format the whole string
    //if not, then have to check which of the user guesses are in the computer's word.
    var tmp = "";
    console.log("in formatting function");
    console.log("wrd argument is: " + wrd);
    console.log("format computer word completely blank");
    if (userGuesses == "") {
      for (i = 0; i < wrd.length; i++) {
        tmp += "_ ";
        console.log(wrd[i]);
        console.log("tmp :" + tmp);
      }
    }
    else {
      console.log("must call the fomrWordWithGuess function to re-format the cmpWordBlank variable content");
      console.log("current guesses are:");
      console.log(userGuesses);
      tmp = formatWordWithGuesses;
    }

      console.log("result before returning from formatunguessedWord function");
      console.log("index arry before ending format function below:");
      // console.log(indexes);
      console.log("'" + tmp + "'");
      return tmp;
    
  }

  function formatWordWithGuesses(wrd) {
    //this function presumes there are some guesses, and formats a string for the display, based on the cmbWordBlan variable contents
    console.log("blank word below: ");
    console.log(cmpWordBlank);

    if (userGuesses == "") {
      return cmpWordBlank;


    }

    return cmpWordBlank;


    //   //loop through the current user guesses
    //   for (k=0; k< userGuesses.length; k++) {
    //     var s = userGuesses[k];
    //     console.log("current char being tested:" + s);
    //     console.log(userGuesses[k]);
    //       //now loop through the chrs in th computer word to see which match the user guess.
    //       for (i =0; i < wrd.length; i++) {
    //       var s1 = wrd[i];
    //       console.log("current letter from computer's word: " + s1);

    //       if (s == s1) {
    //         console.log("user has a matching guess: " + s      + " with " + s1);
    //         tmp += s;
    //         console.log("display version of computer word after adding guessed letter: " + tmp);
    //         indexes.push(i);
    //       }
    //       else {
    //         //if it is not a match, do nothing.
    //         // tmp += " _ ";
    //       }

    //       }

    //   }  //end loop through compuer's word
    // }  //end loop through user guesses


  }


  function cmpPickWord() {
    console.log('computer picks random word from list');
    var idx = 0;
    //generate a random number from 0 to 16
    idx = Math.floor(Math.random() * 17);
    console.log(idx);
    console.log("word index: " + idx);
    console.log("picked word: " + wordList[idx]);
    return wordList[idx];
  }

  function playerLoss() { //NOT WORKING,NOT SURE WHY
    //player has lost the game
    console.log("playerLoss function");
    var x = document.getElementById("youLose");
    x.play;
    alert("you lose!");
  }

  function playerWin() { //AUDIO NOT WORKING, NOT SURE WHY
    //player has won the game
    document.getElementById("youWin").play; s
    alert("You WIN!");
  }


  //**testing code goes here
  // console.log("TESTING MODE");


  // console.log("end testing - return from document ready function");
  // return; //end document.ready function without doing more work





  // Your code here...

  //THIS IS THE START OF THE KEY EVENT HANDLER, THE MAJORITY OF THE GAME ACTION OCCURS IN THIS FUNCTION
  console.log(" on key up event-handler");
  document.onkeyup = function (event) {
    var input = event.key.toUpperCase();
    console.log("you pressed:" + input + ".");

    //check whether game is already in progress
    if (isSpinning !== true) {
      //game is not yet in progress, intialize the game
      console.log("game is not in progress");
      initGame();
      console.log("formatted blank word: " + cmpWordBlank);
    }
    else if (isValid(input)) {
      //user has presed a valid letter key
      console.log("user pressed valid letter: " + input);
      //add user guess to string of user guesses
      userGuesses += input;
      //check if the user guess is in the current word
      //decrement guesses remaining
      userGuessRemaining = userGuessRemaining - 1;
      if (userGuessRemaining <= 0) {
        //player is out of guesses!
        playerLoss();
      }

      //update the screen display
      console.log("update sreen display");
      updateDisplay();
    }
    else {
      //invalid input
      alert("you must press one of the letter keys a-z!!");
    }




  }  //end of onkeyup event function
}) //end of document ready function

