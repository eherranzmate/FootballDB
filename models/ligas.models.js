const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ligasSchema = new Schema(
    {
        nombre:{type: String, required: true},
        pais: {type: String},
        nivel: {type: String},
        numeroEquipos:{type: Number},
        fundacion:{type: Number},
        
    },
    { timestamps: true }
);

const Liga = mongoose.model('Liga', ligasSchema);
module.exports = Liga;