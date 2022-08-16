const Role = require("../models/role");
const Usuario = require("../models/usuario");

const roleValido = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`El rol ${role} no existe en la BD`);
  }
};

//Verificar si el coreeo existe
const emailExiste = async (correo = '') => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error("EL correo indicado ya existe");
  }
};

//Verificar si el usuario existe
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error("EL usuario indicado no existe");
  }
};

module.exports = {
  roleValido,
  emailExiste,
  existeUsuarioPorId
};
