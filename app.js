const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/pack', async (req, res, next) => {
  const speed = req.query.speed;
  const consumption = req.query.consumption;
  const cost = req.query.cost;
  const unloading = req.query.unloading;
  const fine = req.query.fine;
  const ts = req.query.ts;
  console.log(speed, consumption, cost, unloading, fine, ts);
  //const responseWindow = await axios.get(`http://127.0.0.1:5000/routes_with_time_window?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`);
  /* const responseSplit = await axios.get(`http//localhost:5005/routes_with_splits?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`); */
  //const windows = await responseWindow.data;
  /* const split = await responseSplit.data; */

  res.send({
    windows: {"routes": ["0-5-3-2-4-1-0", "0-1-0", "0-1-0", "0-1-0"], "vehicle": ["1", "2", "3", "4"], "price": "10000"},
    split: {"routes": ["0-5-3-2-4-1-0", "0-1-0", "0-1-0", "0-1-0"], "vehicle": ["1", "2", "3", "4"], "price": "10000"},
  })
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
