/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin"); // Import the Firebase Admin SDK
const {generateMockPatient} = require(
    "./patients.js");

// Initialize Firebase Admin SDK
admin.initializeApp({
    databaseURL: "https://qcare-b7741-default-rtdb.firebaseio.com/", // Add your Realtime Database URL here
  });
// Reference to the Realtime Database
const database = admin.database();

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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
