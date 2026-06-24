// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // Importăm conexiunea la Firestore

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rută de test pentru server și Firestore
app.get('/api/status', async (req, res) => {
  try {
    // Încercăm o interogare simplă pentru a verifica conexiunea
    const collections = await db.listCollections();
    res.json({ 
      status: 'success',
      message: 'Serverul Express și Firestore sunt conectate cu succes!', 
      collectionsCount: collections.length,
      timestamp: new Date() 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Eroare la conectarea cu Firestore', 
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serverul Express rulează pe portul ${PORT}`);
});