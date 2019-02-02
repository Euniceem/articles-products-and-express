const express = require('express');
const router = express.Router();
const products = require('../db/products');

router.get('/', (req, res) => {
  let allProducts = products.getProducts();

  res.render('products/index', { products: allProducts });
});

router.post('/', (req, res) => {
  let body = req.body;
  products.addProduct(body.name, body.price, body.inventory);

  if (!typeof name === 'string' || !typeof price === 'string' || !typeof inventory === 'string') {

    res.redirect('/products/new');
  } else {
    res.redirect('/products/index');
  }
});

router.get('/new', (req, res) => {

  // products.addProduct(body.name, body.price, body.inventory);
  res.render('products/new', { products: products });
});

router.get('/:id', (req, res) => {
  let itemId = Number(req.params.id);
  let product = products.getProduct(itemId);
  res.render('products/product', { prod: product });
});

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  const { name, price, inventory } = req.body;
  console.log(name)
  if (products.getProduct(id)) {
    products.editProduct(id, name, Number(price), Number(inventory));
    res.redirect(`/products/${id}`);
  } else {
    res.redirect('/products/new');
  }
});

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);

  if (products.getProduct(id)) {
    products.deleteProduct(id);
    res.redirect('/products/index');
  } else {
    res.redirect('/products/new');
  }
});

router.get('/:id/edit', (req, res) => {
  // let body = req.body;
  let itemId = Number(req.params.id);
  // products.editProduct(id.id, body.name, body.price, body.inventory); 
  let product = products.getProduct(itemId);
  console.log(product)
  res.render('products/edit', { prod: product })

});





module.exports = router;