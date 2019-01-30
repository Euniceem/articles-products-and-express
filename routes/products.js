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
    // res.send('done')
  }
});

router.get('/:id', (req, res) => {
  let itemId = Number(req.params.id);
  let product = products.getProduct(itemId);
  res.render('products/product', { prod: product });
});

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);

  if (products.editProduct(id)) {
    res.redirect('/products/edit' + id);
  } else {
    res.redirect('/products/new');
  }

});

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);

  if (products.deleteProduct(id)) {
    res.redirect('/products/index');
  } else {
    res.redirect('/products/new');
  }

});






module.exports = router;