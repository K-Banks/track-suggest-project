var name = "";
var suggestString = "";
var experience = "";

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
    event.preventDefault();
  });

  $("#formExperience").submit(function(event) {
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
