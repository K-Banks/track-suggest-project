// holds user name
var name = "";
  // holds string of letters used to determine answer via counter
var suggestString = "";
  // holds no and little experience value
var experience = "";
  // holds large experience value, use to eliminate letters from answer string
var altExperience = "";
  // define stringHandler as an array
var stringHandler = [];

$(document).ready(function() {
  // Name and Experience logic
  $("#formName").submit(function(event) {
    // Name logic
    if (name === "") {
      name = "anonymous";
    } else {
      name = $('input#enterName').val();
    }
    console.log(name);
    // Experience logic
    experience = $("input:radio[name=generalExp]:checked").val();
    console.log(experience);
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
        suggestString = stringHandler.toString();
        // // will replace every comma with nothing to create full string without commas
        // suggestString = suggestString.replace(/,/g, '');
      });
    } else {
      $(":checkbox:checked").each(function(temporary) {
        stringHandler[temporary] = $(this).val();
        altExperience = stringHandler.toString();
      });
    }
    $("form#formExperience").slideUp('fast');
    $("form#formFocus").slideDown('fast');
    console.log(suggestString);
    console.log(stringHandler);
    console.log(altExperience);
    event.preventDefault();
  });
  // formFocus script
  $("#formFocus").submit(function(event) {
    suggestString = $('input:radio[name=focus]:checked').val() + suggestString;
    console.log(suggestString);
    $('form#formFocus').slideUp('fast');
    $('form#formWork').slideDown('fast');
    event.preventDefault();
  });
  // formWork script
  $("#formWork").submit(function(event) {
    suggestString = $('input:radio[name=work]:checked').val() + suggestString;
    console.log(suggestString);
    $('form#formWork').slideUp('fast');
    $('form#formFormat').slideDown('fast');
    event.preventDefault();
  });
  // formFormat script and final suggestion logic
  $("#formFormat").submit(function(event) {
    suggestString = $('select#enterFormat').val() + suggestString;
    console.log(suggestString);
    event.preventDefault();
  });
});
