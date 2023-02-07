function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("q1").style.display = "block";
}
document.getElementById("beginquiz").addEventListener("click", startQuiz); // Create a listener for clicks on the 'start the quiz' button on the front page.
var buttons = document.querySelectorAll(".button"); // Get all of the .buttons elements
for (var i = 0; i < buttons.length; i++) {
  // Add an onclick event listener to every element with a class of .buttons
  buttons[i].classList.add("animate__animated", "animate__zoomIn");
  buttons[i].onclick = buttonClicked; // When an element with .buttons is clicked, run the function called buttonClicked
}
var reponses = [];
function buttonClicked(e) {
  var target = e.target;
  reponses.push(target.innerText);
  var selectedType = target.dataset.score; // Get the current element's data-score value
  this.parentElement.style.display = "none"; // Hide the current question div
  var nextQuestion = this.parentElement.dataset.next; // Work out what the next question div is
  if (nextQuestion != "results") {
    document.getElementById(nextQuestion).style.display = "block";
  } else if (nextQuestion == "results") {
    document.getElementById(nextQuestion).style.display = "block";
    for (var i = 0; i < reponses.length; i++) {
      console.log(reponses[i]);
      $("#question" + i).val(reponses[i]);
    }
  }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          event.stopPropagation();

          /*********************************** Collect Data */
          $("#submit-btn").html("<img src='img/bars.svg' alt='Please wait...' />");
          var formData = {
            username: $("input[name='username']").val(),
            email: $("input[name='email']").val(),
            phone: $("input[name='phone']").val(),
            postcode: $("input[name='postcode']").val(),
            url: window.location.href,
            question0: $("input[name='question0']").val(),
            question1: $("input[name='question1']").val(),
            question2: $("input[name='question2']").val(),
            question3: $("input[name='question3']").val(),
            question4: $("input[name='question4']").val(),
            question5: $("input[name='question5']").val(),
            question6: $("input[name='question6']").val(),
            s1: getUrlParameter("s1"),
            s2: getUrlParameter("s2"),
          };
          console.log(formData);
          $.ajax({
            type: "POST",
            url: "process.php",
            data: formData,
          })
            .done(function (message) {
              console.log(message);
              setTimeout(function () {
                setTimeout(function () {
                  var s2 = getUrlParameter("s2");
                  window.location.href = "http://zonnepanelen.offertepagina.com/bedankt.php?s2=" + s2;
                }, 1000);
                $("#submit-btn").html("Thank You!");
                $("#submit-btn").prop("disabled", true);
              }, 2000);
            })
            .fail(function (message) {
              setTimeout(function () {
                $("#submit-btn").html("Error: Pleaase Try Later!");
                $("#submit-btn").prop("disabled", true);
              }, 2000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};
