const mongoose = require('mongoose');
const Liga = require('../models/ligas.models');
require('dotenv').config();

const ligasSeed = [
    { nombre: 'Premier League', pais: 'Inglaterra', nivel: 'Primera División', numeroEquipos: 20, fundacion: 1888 },
    { nombre: 'LaLiga', pais: 'España', nivel: 'Primera División', numeroEquipos: 20, fundacion: 1929 },
    { nombre: 'Serie A', pais: 'Italia', nivel: 'Primera División', numeroEquipos: 20, fundacion: 1898 }
]

const ligaDocuments = ligasSeed.map(liga => new Liga(liga));

mongoose
.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(async()=> {
        console.log('Conectado a MongoDB Atlas');
        const allLigas = await Liga.find();
        if (allLigas.length){
            await Liga.collection.drop();
        }
    })
    .catch((err) => console.log('Error al borrar',err))
    .then(async () => {
       await Liga.insertMany(ligaDocuments);
    })
    .catch((err)=> console.log(`Error creating data: ${err}`))
    .finally(()=>
    mongoose
        .disconnect()
        .then(() => console.log("Desconectado de forma exitosa!"))    
);
