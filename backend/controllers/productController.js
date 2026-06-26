const { db } = require('../firebase');

// READ: Extragerea tuturor produselor
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
    res.status(500).json({ message: 'Eroare la preluarea produselor', error: error.message });
  }
};

// CREATE: Adaugarea unui produs nou
const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    // Daca nu primim un ID, generam unul simplu pe baza timpului
    const productId = newProduct.productId || `prod_${Date.now()}`;
    const productToSave = { ...newProduct, productId };

    await db.collection('products').doc(productId).set(productToSave);
    
    res.status(201).json({ message: 'Produs adaugat cu succes', product: productToSave });
  } catch (error) {
    res.status(500).json({ message: 'Eroare la adaugarea produsului', error: error.message });
  }
};

// UPDATE: Actualizarea unui produs existent
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    await db.collection('products').doc(id).update(dataToUpdate);
    
    res.status(200).json({ message: 'Produs actualizat cu succes' });
  } catch (error) {
    res.status(500).json({ message: 'Eroare la actualizarea produsului', error: error.message });
  }
};

// DELETE: Stergerea unui produs
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('products').doc(id).delete();
    
    res.status(200).json({ message: 'Produs sters cu succes' });
  } catch (error) {
    res.status(500).json({ message: 'Eroare la stergerea produsului', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};