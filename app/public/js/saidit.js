/* global moment */

// When the page loads, grab and display all of our questions
$.get("/api/all", function(data) {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      const row = $("<div>");
      row.addClass("question");

      row.append("<p>" + data[i].name + "</p>");
      row.append("<p>" + data[i].topic + "</p>");
      row.append("<p>" + data[i].question + "abc" + "</p>");
      row.append(
        "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
      );

      $("#question-area").prepend(row);
    }
  }
});

$("#submit-question").on("click", function(event) {
  event.preventDefault();

  const newQuestion = {
    name: $("#name")
      .val()
      .trim(),
    topic: $("#topic")
      .val()
      .trim(),
    question: $("#question")
      .val()
      .trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    like: 0,
    dislike: 0
  };

  console.log(newQuestion);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newQuestion)
    // On success, run the following code
    .then(function() {
      const row = $("<div>");
      row.addClass("question");

      row.append("<p>" + newQuestion.name + "</p>");
      row.append("<p>" + newQuestion.topic + "</p>");
      row.append("<p>" + newQuestion.question + "</p>");
      row.append(
        "<p>At " +
          moment(newQuestion.created_at).format("h:mma on dddd") +
          "</p>"
      );

      $("#question-area").prepend(row);
    });

  // Empty each input box by replacing the value with an empty string
  $("#name").val("");
  $("#topic").val("");
  $("#question").val("");
});
