const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
});

const UsuarioModel = mongoose.model('Usuarios', UsuariosSchema);

module.exports = UsuarioModel;