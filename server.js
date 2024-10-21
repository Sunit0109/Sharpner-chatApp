const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const messagesFile = path.join(__dirname, "/Project-2/message.txt");

// Handle login redirection
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/Project-2/login.html"));
});

// Handle message form page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/Project-2/index.html"));
});

// Handle posting of messages
app.post("/send-message", (req, res) => {
  const { username, message } = req.body;
  const messageEntry = `${username}: ${message}\n`; // Store in "username: message" format

  fs.appendFile(messagesFile, messageEntry, (err) => {
    if (err) throw err;
    res.status(200).end();
  });
});

// Handle fetching of messages
app.get("/Project-2/message", (req, res) => {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) throw err;
    const messages = data.split("\n").filter((line) => line.trim() !== "");
    res.json(messages.map((msg) => {
      const [username, message] = msg.split(": ");
      return { username, message };
    }));
  });
});

app.listen(5500, () => {
  console.log("Server running on http://localhost:5500");
});