require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); //conexiune firestore

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.get('/api/status', async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.json({ 
      status: 'success',
      message: 'Serverul Express si Firestore sunt conectate cu succes!', 
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
  console.log(`Serverul Express ruleaza pe portul ${PORT}`);
});