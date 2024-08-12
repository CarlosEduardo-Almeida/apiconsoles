
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsoleSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    fabricante: { type: String, required: true },
    ano_lancamento: { type: Number, required: true },
    geracao: { type: String, required: true },
    preco: { type: Number, required: true },
    criacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consoles', ConsoleSchema);
