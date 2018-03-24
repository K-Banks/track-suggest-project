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
    $("li#priorExp").append("<li>"+"Ruby"+"</li>");
  }
  if (altExperience.match(/J/) !== null) {
    suggestString = suggestString.replace(/J/g, '');
    experienceTrack = 1;
    $("li#priorExp").append("<li>"+"Java"+"</li>");
  }
  if (altExperience.match(/C/) !== null) {
    suggestString = suggestString.replace(/C/g, '');
    experienceTrack = 1;
    $("li#priorExp").append("<li>"+"C#"+"</li>");
  }
  if (altExperience.match(/S/) !== null) {
    suggestString = suggestString.replace(/S/g, '');
    experienceTrack = 1;
    $("li#priorExp").append("<li>"+"CSS"+"</li>");
  }
  if (experienceTrack === 1) {
    $(".experienced").show();
  }
  suggestString = suggestString.replace(/,/g, '');
  suggestString = suggestString + "SCJR";
}

$(document).ready(function() {
  // Name and Experience logic
  $("#formName").submit(function(event) {
    // Name logic
    if ($('input#enterName').val() === "") {
      name = "anonymous";
    } else {
      name = $('input#enterName').val();
    }
    $("span#namePlace").append(name);
    $("h5").slideDown('slow');
    $("#headerHide").slideUp('slow');
    // Experience logic
    experience = $("input:radio[name=generalExp]:checked").val();
    // Show next question logic (skips question 2 if user has no experience)
    if (experience === "littleExp" || experience === "largeExp") {
      $("form#formExperience").slideDown("slow");
    } else {
      $("form#formFocus").slideDown("slow");
    }
    $("form#formName").slideUp("slow");
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
    $("form#formExperience").slideUp('slow');
    $("form#formFocus").slideDown('slow');
    event.preventDefault();
  });
  // formFocus script
  $("#formFocus").submit(function(event) {
    suggestString = $('input:radio[name=focus]:checked').val() + suggestString;
    $('form#formFocus').slideUp('slow');
    $('form#formWork').slideDown('slow');
    event.preventDefault();
  });
  // formWork script
  $("#formWork").submit(function(event) {
    suggestString = $('input:radio[name=work]:checked').val() + suggestString;
    $('form#formWork').slideUp('slow');
    $('form#formFormat').slideDown('slow');
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
    }
    if (characterCounter < suggestString.match(/S/g).length) {
      maxCharacter = "S";
      characterCounter = suggestString.match(/S/g).length;
      characterCounter = parseInt(characterCounter);
    }
    if (characterCounter < suggestString.match(/J/g).length) {
      maxCharacter = "J";
      characterCounter = suggestString.match(/J/g).length;
      characterCounter = parseInt(characterCounter);
    }
    if (characterCounter < suggestString.match(/C/g).length) {
      maxCharacter = "C";
      characterCounter = suggestString.match(/C/g).length;
      characterCounter = parseInt(characterCounter);
    }
    $("form#formFormat").slideUp('slow');
    $("div.result").slideDown('slow');
    // logic function for revealing track suggestion
    if (experience !== "largeExp") {
      $("span.inexperienced").show();
    }
    if (maxCharacter === "S") {
      $("p.cssReact").slideDown('slow');
    } else if (maxCharacter === "C") {
      $("p.cSharpNet").slideDown('slow');
    } else if (maxCharacter === "R") {
      $("p.rubyRails").slideDown('slow');
    } else if (maxCharacter === "J") {
      $("p.javaAndroid").slideDown('slow');
    }
    $("button.restart").show();
    event.preventDefault();
  });
});
