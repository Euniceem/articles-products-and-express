const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res) => {
  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .then((products) => {
      res.render('templates/products/index', { products: products })
    });
});

router.get('/new', (req, res) => {
  res.render('templates/products/new', { name: true });
});

router.get('/:id', (req, res) => {
  let id = Number(req.params.id);

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .then(products => {
      res.render('templates/products/product', products[0])
    });
});

router.get('/:id/edit', (req, res) => {
  let id = Number(req.params.id);

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .then((product) => {
      res.render('templates/products/edit', product[0])
    });
});

router.post('/', (req, res) => {
  knex('products')
    .insert({
      name: req.body.name,
      price: parseInt(req.body.price),
      inventory: parseInt(req.body.inventory)
    })
    .then(() => {
      console.log('hit')
      res.redirect('/products');
    })
    .catch(() => {
      res.render('templates/products/new', { name: false });
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
      res.redirect('/products/edit');
    })
})

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);

  knex('products')
    .select('id', 'name', 'price', 'inventory')
    .where('id', id)
    .delete()
    .then(() => {
      res.redirect('/products');
    })
    .catch(() => {
      res.redirect(`templates/products/edit`, { name: false });
    });
});


module.exports = router;