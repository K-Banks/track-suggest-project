var name = "";
  // holds user name
var suggestString = "";
  // holds string of letters used to determine answer via counter
var experience = "";
  // holds no and little experience value
var altExperience = "";
  // holds large experience value, use to eliminate letters from answer string

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
      // define suggestString as an index
      suggestString = [];
      // pull each value for checked boxes and compile into index called "temporary"
      $(":checkbox:checked").each(function(temporary) {
        // change value of suggestString to a string consisting of all values from index "temoporary"
        suggestString[temporary] = $(this).val();
        debugger
        var stringHandler = "";
        stringHandler = String.valueof(suggestString);
      });
    } else {
      altExperience = [];
      $(":checkbox:checked").each(function(temporary) {
        altExperience[temporary] = $(this).val();
      });
    }
    console.log(suggestString);
    console.log(stringHandler);
    console.log(altExperience);
    event.preventDefault();
  });

  $("#formFocus").submit(function(event) {
    event.preventDefault();
  });

  $("#formWork").submit(function(event) {
    event.preventDefault();
  });

  $("#formFormat").submit(function(event) {
    event.preventDefault();
  });
});
