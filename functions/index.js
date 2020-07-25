const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid/v4");
const fbAdmin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(require("./firebaseKey.json")),
});
