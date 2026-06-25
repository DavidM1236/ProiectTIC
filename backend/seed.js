const { db } = require('./firebase');

const periferice = [
  {
    productId: 'prod_1',
    name: 'Mouse de Gaming Wireless',
    price: 250,
    category: { id: 'cat_mouse', name: 'Mouse' }
  },
  {
    productId: 'prod_2',
    name: 'Tastatura Mecanica RGB',
    price: 450,
    category: { id: 'cat_tastaturi', name: 'Tastaturi' }
  },
  {
    productId: 'prod_3',
    name: 'Casti Bluetooth cu Microfon',
    price: 320,
    category: { id: 'cat_audio', name: 'Casti' }
  },
  {
    productId: 'prod_4',
    name: 'Monitor LED 27 inch 144Hz',
    price: 1150,
    category: { id: 'cat_monitoare', name: 'Monitoare' }
  },
  {
    productId: 'prod_5',
    name: 'Mousepad XXL Textil',
    price: 80,
    category: { id: 'cat_accesorii', name: 'Accesorii' }
  }
];

async function genereazaProduse() {
  const productsRef = db.collection('products');
  console.log('Incepem adaugarea perifericelor in baza de date...');

  for (const produs of periferice) {
    await productsRef.doc(produs.productId).set(produs);
  }
  
  console.log('Produsele au fost adaugate cu succes!');
}

genereazaProduse().then(() => {
  process.exit();
}).catch((error) => {
  console.error("Eroare:", error);
  process.exit(1);
});