// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
const connection = require("../config/connection.js");
const path = require("path");

// Routes
module.exports = function(app) {
  // Get all questions
  app.get("/api/all", function(req, res) {
    const dbQuery = "SELECT * FROM questions_data";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Add a question
  app.post("/api/new", function(req, res) {
    console.log("Question Data:");
    console.log(req.body);
    console.log(req.body.like);
    let dbQuery =
      "INSERT INTO questions_data (namee, topic, question, created_at, likee, dislikee) VALUES (?,?,?,?,?,?)";

    connection.query(
      dbQuery,
      [
        req.body.name,
        req.body.topic,
        req.body.question,
        req.body.created_at,
        req.body.like,
        req.body.dislike
      ],
      function(err, result) {
        if (err) throw err;
        console.log("Question Successfully Saved!");
        res.end();
      }
    );
  });

  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "homepage.html"));
  // });

  app.get("/ask", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ask.html"));
  });

  // Displays all characters
  app.get("/answer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/answer.html"));
  });

  app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  // Displays a single character, or returns false
};
