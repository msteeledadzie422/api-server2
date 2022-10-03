'use strict';

const express = require('express');
const router = express.Router();
const { foodsInterface } = require('../models');
const validator = require('../middleware/validator');

router.post('/food', validator, async (req, res, send) => {
  console.log('req body', req.body);

  const newFood = await foodsInterface.create(req.body);
  res.status(200).send(newFood);
});

router.get('/foods', async (req, res, next) => {
  try {
    let foods = await foodsInterface.read();
    res.status(200).send(foods);

  } catch(err) {
    next(err);
  }
});

router.get('/foods/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let food = await foodsInterface.read(id);
    res.status(200).send(food);

  } catch(err) {
    next(err);
  }
});

router.put('/foods/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let food = await foodsInterface.update(req.body, id);
    res.status(200).send(food);

  } catch(err) {
    next(err);
  }
});

router.delete('/foods/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let response = await foodsInterface.delete(id);
    res.status(200).send(response);

  } catch(err) {
    next(err);
  }
});

module.exports = router;