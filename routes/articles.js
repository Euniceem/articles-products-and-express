const express = require('express');
const router = express.Router();
const knex = require('../db');


router.get('/', (req, res) => {
  knex('articles')
    .select('title', 'author', 'body')
    .then((articles) => {
      console.log(articles)
      res.render('templates/articles/index', { articles: articles })
    })
});

router.get('/new', (req, res) => {
  res.render('templates/articles/new', { title: true });
});

router.get('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('title', 'author', 'body')
    .where('url_title', url_title)
    .then(article => {
      res.render('templates/articles/article', article[0]);
    });
});

router.get('/:url_title/edit', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('url_title', 'title', 'author', 'body')
    .where('url_title', url_title)
    .then(article => {
      res.render('templates/articles/edit', article[0]);
    });
});


router.post('/', (req, res) => {


  knex('articles')
    .insert({
      url_title: req.body.title,
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    })
    .then(() => {
      res.redirect('/articles');
    })
    .catch(() => {
      res.render('templates/articles/new', { title: false });
    })
});

router.put('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  let updatedBody = req.body;
  updatedBody.url_title = updatedBody.title;

  let title = req.body.title;
  console.log(title)

  knex('articles')
    .select('title', 'author', 'body')
    .where('url_title', req.body.title)
    .then(article => {
      if (article.length > 0) {
        knex('articles')
          .where('url_title', url_title)
          .update(updatedBody)
          .then(art => {
            res.redirect(`/articles/${updatedBody.url_title}`);
          })
      } else {
        res.redirect('articles/edit');
      }
    })
    .catch((err) => {
      console.log(err.message)
      res.status(404);
    })
});

router.delete('/:url_title', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .where('url_title', url_title)
    .delete()
    .then(() => {
      res.redirect(`/articles`);
    })
    .catch(() => {
      res.redirect(`/articles/${url_title}/edit`)
    })
});


module.exports = router;