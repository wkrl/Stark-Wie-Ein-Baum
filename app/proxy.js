const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const axios

require('dotenv').config();

const app = express();
let cache;

app.use(morgan('tiny')); // logs incommings requests
app.use(cors());

const get_main = () => fetch('http://127.0.0.1:4000').then(response => response.json());
const get_data_for_each_tree = () => fetch('http://127.0.0.1:4000/karte').then(response => response.json());
const get_all_trees = () => fetch('http://127.0.0.1:4000/karte/baeume').then(response => response.json());
const get_tree (id) => fetch('http://127.0.0.1:4000/karte')
const get_login_frontend = () => fetch('http://127.0.0.1:4000/login').then(response => response.json());


app.get('/', async (req, res) => {
  return res.json(["test"]);
});

app.get('/karte', async (req, res) => {
  return res.json(await get_data_for_each_tree();
});

app.get('karte/baume', async (req, res) => {
  return res.json(await get_all_trees())
})


app.use(function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
});

app.use(function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
});


const port = 5000;
app.listen(port)
