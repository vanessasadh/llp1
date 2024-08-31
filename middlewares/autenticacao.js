require('dotenv').config();
const chavePrivada = process.env.CHAVE_JWT || '';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../model/usuario');

exports.autenticar = (req, res, next) => {
    const token = req.headers['authorization'];

    jwt.verify(token, chavePrivada, (erro, informacoesUsuario) => {
        if(erro)
            return res.status(401).send({ msg: 'Token inválido ou expirado!' });
        next();
    });
}

exports.logar = async (req, res, next) => {
    /*const usuario = req.headers.usuario;
    const senha = req.headers.senha;*/

    const { email, senha } = req.headers;

    const usuarioEncontrado = await UsuarioModel.findOne({ email });

    if (!usuarioEncontrado) {
        res.status(404).send({ msg: 'E-mail não encontrado!' });
    }

    bcrypt.compare(senha, usuarioEncontrado.senha, function(erro, autenticado) {
        if (erro) {
            return res.status(400).json(erro);
        }

        if (!autenticado) {
            res.status(401).send({ msg: 'Usuário ou Senha errados!' });
        } else {
            const token = jwt.sign(JSON.stringify(usuarioEncontrado), chavePrivada);
            res.status(200).json({ token });
        }
    });

}