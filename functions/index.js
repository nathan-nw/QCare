const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");

// Initialize Firebase Admin SDK
admin.initializeApp({
  databaseURL: "https://qcare-b7741-default-rtdb.firebaseio.com/",
});

// Reference to the Realtime Database
const database = admin.database();

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store in Firebase environment variables
});

// Chatbot function
exports.qbuddyChat = functions.https.onRequest(async (request, response) => {
  try {
    const { message } = request.body;
    if (!message) {
      return response.status(400).send({ error: "Message is required." });
    }

    // Define Qbuddy's personality and guidelines
    const prompt = `
      You are Qbuddy, a friendly chatbot providing emotional support to patients in the ER waiting room.
      - Be warm, kind, and empathetic.
      - Avoid medical advice; focus on comfort and encouragement.
      - Provide distraction techniques like breathing exercises or positive affirmations.
      - Screen for self-harm, suicidal thoughts, or violent behavior and suggest contacting staff if needed.
      
      Patient: ${message}
      Qbuddy:
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    response.status(200).send({ reply: aiResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error in chatbot response:", error.message);
    response.status(500).send({ error: "Something went wrong." });
  }
});
