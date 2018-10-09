var express = require('express');
var jwt = require('jsonwebtoken');
var puerto = process.env.PORT || 3000;
var app = express();

app.use(express.json());

app.get('/calificaciones', function(req, res){
    res.json({
        mensaje: 'Bienvenido al API del kardex'
    });
});

app.listen(puerto, function(){
    console.log('Servidor corriendo en el puerto ' + puerto);
});

app.post('/login', function(req, res){
    var token = jwt.sign({
        usuario: 'alumno'
    }, 'clavesecreta',{expiresIn: '60s'});
    console.log('Token generado: ' + token);
    res.json({
        elToken: token
    });
});