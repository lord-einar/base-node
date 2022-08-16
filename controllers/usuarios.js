const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
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

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPUT = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

  res.json({
    msg: "Hola mundo - PUT - Controller",
    usuario,
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
