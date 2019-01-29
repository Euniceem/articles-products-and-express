const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs')

app.get('/', (req, res) => {

  res.render('home', {});
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})