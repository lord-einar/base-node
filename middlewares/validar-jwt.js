const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async(req, res, next) => {
  const token = req.header("xtoken");

  //Validar que haya llegado un token
  if (!token) {
    return res.status(401).json({
      msg: "No se recibio token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

    const usuarioAutenticado = await Usuario.findById(uid)

    if(!usuarioAutenticado){
      return res.status(401).json({
        msg: "Token no válido - Usuario no existe",
      });
    }

    if(!usuarioAutenticado.estado){
      return res.status(401).json({
        msg: "Token no válido - usuario desactivado",
      });
    }

    req.usuario = usuarioAutenticado;
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
