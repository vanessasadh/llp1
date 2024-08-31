const express = require('express');
const roteador = express.Router();
const autenticacao = require('./middlewares/autenticacao');
const UsuarioModel = require('./model/usuario');
const bcrypt = require('bcrypt');
const chavePrivada = process.env.CHAVE_JWT || '';

/* Métodos HTTP
    GET - trazer dados (listagem de itens)
    POST - enviar dados pra API (salvar novo item)
    PUT - atualização de dados (editar um item)
    DELETE - remover um item

*/
roteador.get('/usuarios', autenticacao.autenticar, function (requisicao, resposta) {
  
  /* 
    1º verificar credenciais;
    2º iria no BD faria uma consulta trazendo todos usuários do sistema;
    3º retornar/devolver uma resposta com esses usuários
    
    const usuarios = buscarUsuariosBD();
    resposta.send(usuarios)
  */
})

roteador.post('/usuario', function (requisicao, resposta) {
  console.log(requisicao.body);

  const novoUsuario = requisicao.body.usuario;

  bcrypt.hash(novoUsuario.senha, chavePrivada, async function(erro, hash) {
    if (erro) {
      return resposta.status(500).json(erro);
    }

    novoUsuario.senha = hash;
    let usuario = await UsuarioModel.create(novoUsuario);

    delete usuario.senha;

    resposta.status(201).json(usuario);
  });

  /* 
    1º verificar credenciais;
    2º pego os dados desse novo usuario e já verifica se está tudo certo

    const novoUsuario = requisicao.body.usuario
                      OU
    const novoUsuario = requisicao.query.usuario
    
    3º iria no BD e salva esse novoUsuario;

    BD.salvarUsuario(novoUsuario);

    4º retornar/devolver uma resposta informando se deu certo ou não salvar esse novoUsuario;

  */
})

roteador.put('/usuario', autenticacao.autenticar, function (requisicao, resposta) {
  /* 
    1º verificar credenciais;
    2º pego os dados desse usuario e já verifica se está tudo certo

    const usuarioParaEditar = requisicao.body.usuario
                      OU
    const usuarioParaEditar = requisicao.query.usuario
    
    3º iria no BD e edito essas informações de usuarioParaEditar;

    BD.editarUsuario(ID, usuarioParaEditar);

    4º retornar/devolver uma resposta informando se deu certo ou não salvar esse novoUsuario;
  */
})

roteador.delete('/usuario', autenticacao.autenticar, function (requisicao, resposta) {
  /* 
    1º verificar credenciais;
    2º pego os dados desse usuario e já verifica se está tudo certo

    const idUsuarioParaDeletar = requisicao.body.usuario
                      OU
    const idUsuarioParaDeletar = requisicao.query.usuario
    
    3º iria no BD e deleto esse usuário através do idUsuarioParaDeletar;

    BD.deletarUsuario(idUsuarioParaDeletar);

    4º retornar/devolver uma resposta informando se deu certo ou não salvar esse novoUsuario;
  */
})

//http://localhost:3000/
roteador.get('/', function (req, res) {
  res.send('<h1>Olá!!</h1>');
})



exports.roteador = roteador;