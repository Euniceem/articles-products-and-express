const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const products = require('./routes/products');
const articles = require('./routes/articles');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', products);
app.use('/articles', articles);

app.get('/', (req, res) => {
  res.render('/index');
});

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

