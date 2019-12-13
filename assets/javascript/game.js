/*This is the JS code for the Word-Guess game */



$(document).ready(function() {
  console.log("document is ready");


  // Gobal variables
  var isSpinning = false;  // a gaame is not happening now

  var userGuesses = "";        //a string containing all of the letters the use has tried, so far
  var userWins = 0;           //the number of wins the user has had in this play session
  var userGuessRemaining = 0; //the number of guesses remaining to the user
  var compWord = "";           //the word the computer picked for the user to guess.
  var cmpWordBlank = "";

    //list of words from which computer will selest a word (17 total)
    var wordList = ["ROCKET", "LOX", "CAPSULE", "GEMINI", "MERCURY", "APOLLO", "SHUTTLE", "BALLISTIC", "SPACECRAFT", "COUNTDOWN", 
    "VOYAGER", "SATELLITE", "SPUTNIK", "ORBITAL", "SUBORBITAL", "FREEFALL", "ACCELERATION" ];


    //list of letters in the alphabet, used to screen user input.
    var alphabet = ["a","b","c","d","e","f","g","h", "i","j","k","l","m","n","o","p", "q","r","s","t","u","v","w","x","y","z"];

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
          for (i=0; i <= alphabet.length; i++)
          // console.log(alphabet[i])
          if (letter == alphabet[i]) {
            //we found what we were looking for
            rslt = true;
          }

        }
        return rslt;

    }

  function initGame() {
    console.log("initialize the game");
    //this functions resets the game and onscreen elements ready to start a new word
    userGuesses = ""  //reset user guesses to empty string
    //note userWins should not be reset, as that is the total number of wins for the entire session
    userGuessRemaining = 26;  //usr gets a total of 26 guesses each word.
    compWord = cmpPickWord();
    compWord = compWord.toLowerCase();
    console.log("computer word is '" + compWord +"'");
    //change the content of h1 with id="PROMPT1"
    var E = document.getElementById("PROMPT1").innerText = "GAME IS IN PROGRESS";
    E.innertext = cmpword;
        //display info
        // cmpWordBlank = formatUnguessed(cmpword);
    var W = document.getElementById("cmpword").innerText=formatUnGuessed(compWord);
    console.log("result of formatUnGuessed '" + formatUnGuessed(compWord) + "'")
    W.innertext = "NEW TEXT";
        

    //set game in progress flag to true;
    isSpinning = true;
  }

function formatUnGuessed(wrd) {
  //this function formats the unguessed word for display
  //if the string of user guesses is empty, then format the whole string
  //if not, then have to check which of the user guesses are in the computer's word.
  var tmp = "";
  console.log("in formatting function");
  console.log("wrd argument is: " + wrd);
  if (userGuesses == "") {
    console.log("format computer word completely blank");
    for ( i=0; i < wrd.length; i++) {
      tmp += "_ ";
      console.log (wrd[i]);
      console.log("tmp :" + tmp);
    }
  }
  else {
    console.log("must see which of the userg guesses were correct");
  }
  return tmp;
}

function cmpPickWord() {
  console.log('computer picks random word from list');
  var idx = 0;
  
  //generate a random number from 0 to 17

  // console.log("random number: " + Math.floor(Math.random() * 18));
  idx = Math.floor(Math.random()* 18);
  // console.log("VALUE OF IDX:");
  console.log(idx);
  // console.log("idx type " + typeof(idx));
  // idx = Math.floor(idx);
  // console.log ("idx rounded with Floor: ");
  // console.log(idx);
  // idx = parseInt(idx);
  console.log("word index: " + idx);
  return wordList[idx];
}




  
// // testing for longest word in the wordList
// var tmp=0;
// for(i=0;i<wordList.length;i++ ) {
//   var wrd = wordList[i];
//   // console.log("length of wordlist array: " + wordList.length)
//   // if (tmp < wrd.length) {tmp = wrd.length + wrd }  //find the laongest word
//   // console.log("word: " + i);
//   console.log( wrd + " length: " + wrd.length);
//   // console.log(tmp)
// }

// return;

// var tmp = "Y";
// console.log("result of isValid: " + isValid(tmp))

// return;



// Your code here...

//THIS IS THE START OF THE KEY EVENT HANDLER, MOST OF THE GAME ACTION OCCURS IN THIS FUNCTION
console.log(" on key up event-handler");
document.onkeyup = function (event) {
 var input = event.key;
 console.log("you pressed:" + input + ".");

//check whether game is already in progress
 if (isSpinning !== true) {
   //game is not yet in progress, intialize the game
  console.log("game is not in progress");
  initGame();
}
else if (isValid(input)) {
  //user has presed a valid letter key
  console.log("user pressed valid letter: " + input);
}
else {
  //invalid input
  alert("you must press one of the letter keys a-z!!");
}



}




}

)
