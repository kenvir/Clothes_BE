const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const hbs = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

// Template Engine
app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger
app.use(morgan('combined'));

// Route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
