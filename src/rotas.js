const rotas = require('express').Router();
const multer = require('multer');
const configmulter = require('./config/multer');

const ImgModel = require('./models/ImgModel');

rotas.post("/upload", multer(configmulter).single("file"),async (request, response)=> {
   const {location:url= ""} = request.file;
   const post = await ImgModel.create({ 
       nome: request.file.originalname,
       tamanho: request.file.fileSize,
       key: request.file.key,
       url 
    });

    return response.json(post);
});


module.exports = rotas; //exporta as rotas