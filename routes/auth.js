const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

router.post("/login",[
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
], login);

router.post("/google",[
    check("id_token", "id_token es obligatorio").not().isEmpty(),
    validarCampos
], googleSignIn);



module.exports = router;