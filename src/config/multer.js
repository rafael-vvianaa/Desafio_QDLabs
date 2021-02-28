require('dotenv').config();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');




const storageType = {
    
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE, //ser aberto no navegador 
        acl: 'public-read',//arquivos publicos para visualizar
        key:(req, file, cb) =>{

             const fileName = `${uuidv4()}-${file.originalname}`;
            
             cb(null, fileName);
        }, 
        
    })

};

module.exports = {
   
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