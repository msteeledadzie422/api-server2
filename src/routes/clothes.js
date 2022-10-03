'use strict';

const express = require('express');
const router = express.Router();
const { clothesInterface } = require('../models');
const validator = require('../middleware/validator');

router.post('/clothes', validator, async (req, res, send) => {
  console.log('req body', req.body);

  const newClothe = await clothesInterface.create(req.body);
  res.status(200).send(newClothe);
});

router.get('/clothes', async (req, res, next) => {
  try{
    let clothes = await clothesInterface.read();
    res.status(200).send(clothes);

  } catch(err){
    next(err);
  }
});

router.get('/clothes/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let clothe = await clothesInterface.read(id);
    res.status(200).send(clothe);

  } catch(err) {
    next(err);
  }
});

router.put('/clothes/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    let clothe = await clothesInterface.update(req.body, id);
    res.status(200).send(clothe);

  } catch(err) {
    next(err);
  }
});

router.delete('/clothes/:id', async (req, res, next) => {
  try{
    let { id } = req.params;

    let response = await clothesInterface.delete(id);
    res.status(200).send(response);

  } catch(err) {
    next(err);
  }
});

module.exports = router;