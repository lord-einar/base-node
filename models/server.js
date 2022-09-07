const express = require('express')
const cors = require('cors');
const dbConnection = require('../database/config');

class Server {

    constructor() {

        this.app = express()
        this.port = process.env.PORT

        //Conectar a base de datos
        this.conectarDB();

        this.middlewares();
        this.routes();


    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo JSON
        this.app.use( express.json() )

        //Establecer carpeta publica
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'))
        this.app.use('/api/auth', require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;