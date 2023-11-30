const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();
const Liga = require('../models/ligas.models');


router.get("/", async (req, res)=> {
    try {
      const players = await Liga.find();
      return res.status(200).json(players);
    } catch (err) {
      next(err)
    }
})


router.get('/:id', async (req, res) => {
      try {
        const id = req.params.id;
          const liga = await Liga.findById(id);
          if (liga) {
              return res.status(200).json(liga);
          } else {
              return res.status(404).json('No se ha encontrado la liga');
          }
      } catch (err) {
          return res.status(500).json(err);
      }
});

module.exports = router;