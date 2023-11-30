const mongoose = require('mongoose')
const {connect} = require("./utils/db")
connect()
require('dotenv').config();
const express = require("express");
const PORT = 3000;
const server = express();
const cors = require("cors");
const router = express.Router();

const Player = require('./models/players.models');
const Liga = require('./models/ligas.models');

const playerRoutes = require('./routes/players.routes');
const ligasRoutes = require('./routes/ligas.routes');

server.use(cors());
//middleware para parsear el cuerpo de las colicitudes de JSON
server.use(express.json());

server.use('/players', playerRoutes);
server.use('/ligas', ligasRoutes);

server.use((err, req, res, next) => {
	return res.status(err.status ||500).json(err.message ||'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
})