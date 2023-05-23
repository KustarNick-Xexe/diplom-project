const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/pack', async (req, res, next) => {
  const speed = req.params.speed;
  const consumption = req.params.consumption;
  const cost = req.params.cost;
  const unloading = req.params.unloading;
  const fine = req.params.fine;
  const ts = req.params.ts;
  const responseWindow = await axios.get(`http//localhost:5000/routes_with_timewindow?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`);
  const responseSplit = await axios.get(`http//localhost:5005/routes_with_timewindow?speed=${speed}&consumption=${consumption}&cost=${cost}&unloading=${unloading}&fine=${fine}&ts=${ts}`);
  const windows = await responseWindow.data;
  const split = await responseSplit.data;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
