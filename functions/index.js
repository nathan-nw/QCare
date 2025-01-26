const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  databaseURL: "https://qcare-b7741-default-rtdb.firebaseio.com/",
});

exports.generateMockPatient = functions.https.onRequest(async (request, response) => {
  try {
    const patientId = request.query.patientId || request.body.patientId;

    if (!patientId) {
      return response.status(400).send({ error: "Patient ID is required." });
    }

    // Get all patients
    const snapshot = await database.ref("patients").get();

    if (!snapshot.exists()) {
      return response.status(404).send({ error: "No patients found." });
    }

    // Find the patient with the matching ID
    let patientData = null;
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().id === patientId) {
        patientData = childSnapshot.val();
      }
    });

    if (!patientData) {
      return response.status(404).send({ error: "Patient not found." });
    }

    // Optional: Store the retrieved patient in another node
    await database.ref(`retrievedPatients/${patientId}`).set(patientData);

    // Return the patient data
    response.status(200).send(patientData);
  } catch (error) {
    console.error("Error generating mock patient:", error.message);
    response.status(500).send({
      error: error.message,
    });
  }
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
