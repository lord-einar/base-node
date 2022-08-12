const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");

const usuariosGET = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "Hola mundo - GET - Controller",
  });
};

const usuariosPOST = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  //Verificar si el coreeo existe


  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPUT = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "Hola mundo - PUT - Controller",
    id,
  });
};

const usuariosDELETE = (req, res = response) => {
  res.json({
    msg: "Hola mundo - DELETE - Controller",
  });
};

module.exports = {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
};
