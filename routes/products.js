const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res) => {
  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .then((products) => {
      console.log("GET PRODUCTS ", products)
      res.render('templates/products/index', { products: products })
    })
});

router.get('/new', (req, res) => {
  res.render('templates/products/new');
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .then(products => {
      console.log('Get One product: ', products)
      res.render('templates/products/product', { prod: products[0] })
    })
});

router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id);

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .then((product) => {
      res.render('templates/products/edit', { prod: product[0] })
    })
});

router.post('/', (req, res) => {
  knex('products')
    .insert({
      name: req.body.name,
      price: parseInt(req.body.price),
      inventory: parseInt(req.body.inventory)
    })
    .then(() => {
      res.redirect('/products');
    });
});

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  let body = req.body;
  body.price = parseInt(body.price);
  body.inventory = parseInt(body.inventory);

  knex('products')
    .where('id', id)
    .update(body)
    .then(() => {
      res.redirect(`/products/${id}`);
    })
    .catch(() => {
      res.redirect('/products/new');
    })
})

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);
  knex('products')
    .where('id', id)
    .delete()
    .then(() => {
      console.log('DELETE ID: ', id)
      res.redirect('/products');
    })
    .catch(() => {
      res.redirect('/products/new');
    })
});


module.exports = router;