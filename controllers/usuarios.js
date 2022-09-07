const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGET = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios
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

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario
  });
};

const usuariosDELETE = async (req, res = response) => {
const {id} = req.params;

const usuario = await Usuario.findByIdAndUpdate(id, { estado: false}, {new: true})

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
};
