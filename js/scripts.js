// holds user name
var name = "";
// holds string of letters used to determine answer via counter. begins with a string of letters to enable letter counter function
var suggestString = "ASCJR";
// holds no and little experience value
var experience = "";
// holds large experience value, use to eliminate letters from answer string
var altExperience = "";
// define stringHandler as an array
var stringHandler = [];
// use for final logic, will hold most common letter in suggestString
var maxCharacter = "";
// use for counting characters
var characterCounter = "";

// this custom fucntion will remove any track options that a user has significant experience in
var experienceElim = function() {
  var experienceTrack = 0;
  if (altExperience.match(/R/) !== null) {
    // will replace every comma with nothing to create full string without commas
    suggestString = suggestString.replace(/R/g, '');
    experienceTrack = 1;
  }
  if (altExperience.match(/J/) !== null) {
    suggestString = suggestString.replace(/J/g, '');
    experienceTrack = 1;
  }
  if (altExperience.match(/C/) !== null) {
    suggestString = suggestString.replace(/C/g, '');
    experienceTrack = 1;
  }
  if (altExperience.match(/S/) !== null) {
    suggestString = suggestString.replace(/S/g, '');
    experienceTrack = 1;
  }
  if (experienceTrack === 1) {
    $("div.experienced").show();
  }
  suggestString = suggestString.replace(/,/g, '');
  suggestString = suggestString + "SCJR";
}

$(document).ready(function() {
  // Name and Experience logic
  $("#formName").submit(function(event) {
    // Name logic
    if (name === "") {
      name = "anonymous";
    } else {
      name = $('input#enterName').val();
    }
    // Experience logic
    experience = $("input:radio[name=generalExp]:checked").val();
    // Show next question logic (skips question 2 if user has no experience)
    if (experience === "littleExp" || experience === "largeExp") {
      $("form#formExperience").slideDown("fast");
    } else {
      $("form#formFocus").slideDown("fast");
    }
    $("form#formName").slideUp("fast");
    event.preventDefault();
  });
  // Specific Experience logic
  $("#formExperience").submit(function(event) {
    if (experience === 'littleExp') {
      // pull each value for checked boxes and compile into array called "temporary"
      $(":checkbox:checked").each(function(temporary) {
        // change value of suggestString to a string consisting of all values from array "temoporary"
        stringHandler[temporary] = $(this).val();
        // converts stringHandler array to a string and assigns value to suggestString
        suggestString = suggestString + stringHandler.toString();
      });
    } else {
      $(":checkbox:checked").each(function(temporary) {
        stringHandler[temporary] = $(this).val();
        altExperience = stringHandler.toString();
      });
    }
    $("form#formExperience").slideUp('fast');
    $("form#formFocus").slideDown('fast');
    event.preventDefault();
  });
  // formFocus script
  $("#formFocus").submit(function(event) {
    suggestString = $('input:radio[name=focus]:checked').val() + suggestString;
    $('form#formFocus').slideUp('fast');
    $('form#formWork').slideDown('fast');
    event.preventDefault();
  });
  // formWork script
  $("#formWork").submit(function(event) {
    suggestString = $('input:radio[name=work]:checked').val() + suggestString;
    $('form#formWork').slideUp('fast');
    $('form#formFormat').slideDown('fast');
    event.preventDefault();
  });
  // formFormat script and final suggestion logic
  $("#formFormat").submit(function(event) {
    suggestString = $('select#enterFormat').val() + suggestString;
    experienceElim();
    characterCounter = suggestString.match(/A/g).length;
    characterCounter = parseInt(characterCounter);
    if (characterCounter < suggestString.match(/R/g).length) {
      // will determine which letter is most common in suggestString. Does not work when # of character searched for is <1
      characterCounter = suggestString.match(/R/g).length;
      characterCounter = parseInt(characterCounter);
      maxCharacter = "R";
    } else if (characterCounter < suggestString.match(/S/g).length) {
      maxCharacter = "S";
      characterCounter = suggestString.match(/S/g).length;
      characterCounter = parseInt(characterCounter);
    } else if (characterCounter < suggestString.match(/J/g).length) {
      maxCharacter = "J";
      characterCounter = suggestString.match(/J/g).length;
      characterCounter = parseInt(characterCounter);
    } else if (characterCounter < suggestString.match(/C/g).length) {
      maxCharacter = "C";
      characterCounter = suggestString.match(/C/g).length;
      characterCounter = parseInt(characterCounter);
    }

    $("div.result").show();
    $("form#formFormat").slideUp('fast');
    // logic function for revealing track suggestion
    if (maxCharacter === "S") {
      $("div.cssReact").slideDown('fast');
    } else if (maxCharacter === "C") {
      $("div.cSharpNet").slideDown('fast');
    } else if (maxCharacter === "R") {
      $("div.rubyRails").slideDown('fast');
    } else if (maxCharacter === "J") {
      $("div.javaAndroid").slideDown('fast');
    }
    $(".restart").show();
    event.preventDefault();
  });
});
