const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase-key.json');

// Inițializăm aplicația folosind sintaxa nouă
initializeApp({
  credential: cert(serviceAccount)
});

// Obținem instanța bazei de date
const db = getFirestore();

module.exports = { db };