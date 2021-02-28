const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageType = {
    

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'imgexemple',
        contentType: multerS3.AUTO_CONTENT_TYPE, // para poder ser aberto no navegador envez do download
        acl: 'public-read',// deixar os arquivos publicos para visualizar
        key:(req, file, cb) =>{
            crypto.randomBytes(16, (err,hash) =>{
                if(err) cb(err);
 
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
 
                cb(null, fileName);
            });
        }
    })


};

module.exports = {
   dest: path.resolve(__dirname, '..','..', 'tmp', 'upload'),
   storage: storageType["s3"],
   limits: {
       fileSize: 2 * 1024 * 1024
   },
   fileFilter: (req, file, cb) => {
       const allowedMimes =[
           'image/jpeg',
           'image/png',
           'image/pjpeg'
       ];

       if (allowedMimes.includes(file.mimetype)){
           cb(null, true);
       } else {
           cb(new Error('Tipo de arquivo inválido.'))
       }
   }

};