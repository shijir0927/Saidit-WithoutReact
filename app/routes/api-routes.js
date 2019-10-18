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

  // Displays a single character, or returns false
  app.get("/api/all/:character", function(req, res) {
    var chosen = req.params.character;

    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }

    return res.json(false);
  });

  // Create New Characters - takes in JSON input
  app.post("/api/characters", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newCharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name
      .replace(/\s+/g, "")
      .toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
  });
};
