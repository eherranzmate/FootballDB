const {connect} = require("./utils/db")
connect()

const express = require("express");
const PORT = 3000;
const server = express();
const router = express.Router();

const Player = require('./models/players.models');
const Liga = require('./models/ligas.models');

//router.get("/", (req, res) => res.send('Bienvenido a la página'));

router.get("/players", async (req, res)=> {
    try {
      const players = await Player.find();
      return res.status(200).json(players);
    } catch {
      return res.status(500).json(err);
    }
});
  
router.get('/players/:id', async (req, res) => {
      const id = req.params.id;
      try {
          const player = await Player.findById(id);
          if (player) {
              return res.status(200).json(player);
          } else {
              return res.status(404).json('No se ha encontrado el jugador');
          }
      } catch (err) {
          return res.status(500).json(err);
      }
});

router.get("/ligas", async (req, res)=> {
    try {
      const ligas = await Liga.find();
      return res.status(200).json(ligas);
    } catch {
      return res.status(500).json(err);
    }
});
  
router.get('/ligas/:id', async (req, res) => {
      const id = req.params.id;
      try {
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
  


server.use('/', router);

server.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
})