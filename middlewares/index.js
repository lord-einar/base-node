
const validarCampos =require('../middlewares/validar-campos');
const validarRoles = require("../middlewares/validar-role");
const validarJWT  = require("../middlewares/validar-jwt");


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}