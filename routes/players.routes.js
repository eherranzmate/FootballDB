const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();
const Player = require('../models/players.models');
const Liga = require('../models/ligas.models');

router.get("/", async (req, res, next)=> {
    try {
        const players = await Player.find().populate('liga');
        console.log('Jugadores:', players);
      return res.status(200).json(players);
    } catch (err) {
      next(err)
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const playerFound = await Player.findById(id);
        return res.status(200).json(playerFound)
    } catch (err) {
          next(err)
      }
});

router.post('/create', async (req, res, next) => {
    try {
        let liga = await Liga.findOne({nombre: req.body.liga});
        // Si no existe la liga, la registramos en la case de datos.
        if(!liga){
            const newLeague = new Liga ({
                nombre: req.body.liga,
            });
            liga = await newLeague.save();
        }
        console.log(liga)
        const newPlayer = new Player({
            nombre:req.body.nombre,
            edad: req.body.edad,
            nacionalidad: req.body.nacionalidad,
            posicion: req.body.posicion,
            retirado: req.body.retirado,
            liga: liga._id,
        });
        console.log('Liga:', liga);
        console.log('Nuevo jugador:',newPlayer);
        const createdPlayer = await newPlayer.save();
        return res.status(201).json(createdPlayer)
    } catch(err){
        next(err)

    }
})

module.exports = router;

// {
//     "nombre": "Neymar",
//     "edad": "31",
//     "retirado":"false",
//     "posicion":"Delantero",
//     "liga":"Saudi Pro League"
// }