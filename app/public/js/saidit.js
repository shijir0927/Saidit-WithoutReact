/* global moment */

// When the page loads, grab and display all of our questions
$.get("/api/all", function(data) {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      const row = $("<div>");
      row.addClass("question");
      let answerButton = $(`<button id = "answer">Answer</button>`);
      let likeButton = $(`<button id = "like">Like</button>`);
      let dislikeButton = $(`<button id = "dislike">Dislike</button>`);
      answerButton.addClass("answer-button");
      row.append("<h4>" + data[i].namee + " asked a question" + "</h4>");
      row.append("<h5>" + "Topic: " + data[i].topic + "</h5>");
      row.append("<p>" + data[i].question + "</p>");
      row.append(
        "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
      );
      row.append(answerButton);
      row.append(likeButton);
      row.append(dislikeButton);

      row.append(`<h6 class = "likes">Like:</h6>` + data[i].likee);
      row.append(`<h6 class = "likes">disLike:</h6>` + data[i].dislikee);
      console.log(data[i]);
      $("#question-area").prepend(row);

      $("#like").on("click", function(event) {
        event.preventDefault();
        data[i].likee += 1;

        row.append("<h6>Like:</h6>" + data[i].likee);
        row.append("<h6>disLike:</h6>" + data[i].dislikee);
      });

      $("#dislike").on("click", function(event) {
        event.preventDefault();
        data[i].dislikee += 1;
        row.append("<h6>Like:</h6>" + data[i].likee);
        row.append("<h6>disLike:</h6>" + data[i].dislikee);
      });

      $("#answer").on("click", function(event) {
        event.preventDefault();
        let answerArea = $(`<textarea id = "answerText">`);
        let answerSubmitButton = $(
          `<button id = "submit-answer">Submit Answer</button>`
        );
        row.append("<br><br>");
        row.append(answerArea);
        row.append("<br>");
        row.append(answerSubmitButton);
        $("#submit-answer").on("click", function(event) {
          answerSubmitButton.attr("style", "display:none");
          answerArea.attr("style", "display:none");
          let answerText = $("#answerText")
            .val()
            .trim();
          row.append("<h4>Answer:</h4>" + answerText);
        });
      });
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
  if (newQuestion.name && newQuestion.topic && newQuestion.question) {
    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newQuestion)
      // On success, run the following code
      .then(function() {
        const row = $("<div>");

        row.addClass("question");
        row.append("<h2>" + newQuestion.name + "asked" + "</h2>");
        row.append("<h3>" + "Topic: " + newQuestion.topic + "</h3>");
        row.append("<p>" + newQuestion.question + "</p>");
        row.append(
          "<p>At " +
            moment(newQuestion.created_at).format("h:mma on dddd") +
            "</p>"
        );
        row.append(newQuestion.like);
        row.append(newQuestion.dislike);

        $("#question-area").prepend(row);
      });

    alert("Question Submitted Succesfully!");
    // Empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#topic").val("");
    $("#question").val("");
  } else {
    alert("Please fill out all the required fields!");
  }
});
