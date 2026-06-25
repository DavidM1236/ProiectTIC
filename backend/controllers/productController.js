const { db } = require('../firebase');

// Extragerea tuturor produselor
const getAllProducts = async (req, res) => {
  try {
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    
    if (snapshot.empty) {
      return res.status(404).json({ message: 'Nu a fost gasit niciun produs.' });
    }

    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ 
      message: 'Eroare la preluarea produselor din baza de date', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllProducts
};