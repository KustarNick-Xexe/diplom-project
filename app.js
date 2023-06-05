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
  console.log(speed, consumption, cost, unloading, fine);
  await axios.delete('http://localhost:3007/api/plans');
  await axios.delete('http://localhost:3007/api/plans2');
  const responseSplit = await axios.get(`http://127.0.0.1:5005/routes_with_splits?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}`);
  const responseWindow = await axios.get(`http://127.0.0.1:5000/routes_with_time_window?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}`);
  const windows = responseWindow.data;
  const split = responseSplit.data;
  console.log(windows.price, split.price)
  res.send({
    windows: windows,
    split: split,
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