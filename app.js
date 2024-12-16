const express = require("express");
const WebSocket = require("ws");
const http = require("http");

// Predefined list of sentences to simulate a transcript
const SENTENCES = [
  "Hello, how are you doing today?",
  "This is a simulated transcript.",
  "Node.js is great for real-time applications.",
  "Let's create a mock real-time transcript generator.",
  "This sentence is unique in the stream.",
  "Here's another unique sentence for variety.",
  "Real-time transcripts can be exciting to work with!",
  "The API ensures no consecutive repeats of sentences.",
];

// Helper function to get a random sentence (avoiding consecutive repeats)
let previousSentence = null;
function getRandomSentence() {
  let sentence;
  do {
    sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  } while (sentence === previousSentence);
  previousSentence = sentence;
  return sentence;
}

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// WebSocket server setup
const wss = new WebSocket.Server({ server });

// WebSocket endpoint for real-time transcript streaming
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Stream sentences to the client every second
  const interval = setInterval(() => {
    const sentence = getRandomSentence();
    ws.send(sentence);
  }, 1000);

  // Cleanup when the client disconnects
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clearInterval(interval);
  });
});

// Normal API endpoint to return a new transcript sentence
app.get("/normal-transcript", (req, res) => {
  const sentence = getRandomSentence();
  res.json({ transcript: sentence });
});

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`WebSocket endpoint available at ws://localhost:${PORT}`);
});