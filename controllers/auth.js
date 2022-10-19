const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignIn = async(req, res) => {

    const { id_token } = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne( {correo} )

        if( !usuario ){
            const data = {
                nombre,
                correo,
                img,
                password: 'by Google',
                google: true
            }

            usuario = new Usuario( data )

            console.log(usuario)
            let info = await usuario.save();

            console.log(info)
        }

        if(!usuario.estado){
            res.status(401).json({
                msg: "Usuario bloqueado. Comuniquese con el administrador"
            })
        }

        const token = await generarJWT(usuario.id);



    
        res.json({usuario, token})
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        })
    }

}

module.exports = {
    login,
    googleSignIn
}