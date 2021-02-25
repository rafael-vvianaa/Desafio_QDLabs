const rotas = require('express').Router();
const multer = require('multer');
const configmulter = require('./config/multer');

rotas.post('/upload', multer(configmulter).single('file'),(request, response)=> {
    return response.json({hello: 'world'});
});


module.exports = rotas; //exporta as rotas