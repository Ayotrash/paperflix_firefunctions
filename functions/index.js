require('dotenv').config();
const functions = require('firebase-functions');
const admin     = require('firebase-admin');
const serviceAccount = require('./paperflix-firebase-key.json');

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paperflix-company.firebaseio.com"
}

admin.initializeApp(firebaseConfig);

const REGISTER = require('./src/register');

exports.register = functions.https.onRequest(REGISTER);