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

    } else {

    }
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
