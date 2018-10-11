var express = require('express');
var jwt = require('jsonwebtoken');
var puerto = process.env.PORT || 3000;
var app = express();

app.use(express.json());

app.get('/calificaciones', function(req, res){
    console.log('Token recibido ' + req.query.token);
    jwt.verify(req.query.token, 'clavesecreta', function(error, token){
        if(error)
        {
            res.status(403).json({mensaje: 'Autorización no valida'});
        }
        else
        {
            res.json({
                mensaje: 'Bienvenido' + token.usuario + 'Aqui estan las calificaciones...'
            });
        }
    });
});

app.listen(puerto, function(){
    console.log('Servidor corriendo en el puerto ' + puerto);
});

app.post('/login', function(req, res){
    //simular la BD
    var alumno = {
        email: 'alumno@uaslp.mx',
        password: '123'
    };

    var profesor = {
        email: 'profesor@uaslp.mx',
        password: 'abc'
    };

    if(req.body.email == alumno.email && req.body.password == alumno.password)
    {
        var token = jwt.sign({
            usuario: 'alumno',
            nombre: 'Jessi',
            clave: 212121
        }, 'clavesecreta',{expiresIn: '3h'});
        console.log('Token generado: ' + token);
        res.json({
            mensaje: 'Bienvenido alumno',
            elToken: token
        });
    }
    else if(req.body.email == profesor.email && req.body.password == profesor.password)
    {
        var token = jwt.sign({
            usuario: 'profesor',
            nombre: 'Edd',
            clave: 123
        }, 'clavesecreta',{expiresIn: '60s'});
        console.log('Token generado: ' + token);
        res.json({
            mensaje: 'Bienvenido Profesor',
            elToken: token
        });
    }
    else
    {
        res.status(401).json({mensaje: 'Credenciales no validas'});
        elToken: null
    }
});