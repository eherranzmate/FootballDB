const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playersSchema = new Schema(
    {
        nombre:{type: String, required: true},
        edad: {type: Number},
        nacionalidad: {type: String},
        posicion:{type: String},
        retirado:{type: Boolean},
        liga:{type: String, required: true},
    },
    { timestamps: true }
);

const Player = mongoose.model('Player', playersSchema)

module.exports = Player;