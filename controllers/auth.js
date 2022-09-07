const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");


const login = async(req, res) => {

    const { correo, password } = req.body;

    //Verificar que el correo existe y está activo
    const usuario = await Usuario.findOne({correo, estado: true})
    if(!usuario){
        return res.status(400).json({
            msg: "El correo o la contraseña no son correctos"
        })
    } 

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if(!validPassword){
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        })
    }
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
    
    
}

module.exports = {
    login
}