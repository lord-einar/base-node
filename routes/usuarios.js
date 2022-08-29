const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } =require('../middlewares/validar-campos');
const { roleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
} = require("../controllers/usuarios");


const router = Router();

router.get("/", usuariosGET);

router.post("/",[
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("correo", "El formato del correo no es válido").isEmail(),
  check("correo").custom(emailExiste),
  check("password", "El password debe tener como mínimo 6 caracteres").isLength({ min: 6 }),
  check("role").custom(roleValido),
  validarCampos
], usuariosPOST);

router.put("/:id", [
  check("id", "El id indicado no es válido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  check("role").custom(roleValido),
  validarCampos
], usuariosPUT);

router.delete("/:id", [
  check("id", "El id indicado no es válido").isMongoId(),
  check("id").custom(existeUsuarioPorId)
], usuariosDELETE);

module.exports = router;
