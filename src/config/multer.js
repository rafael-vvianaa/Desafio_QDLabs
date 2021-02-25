const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
module.exports = {
   dest: path.resolve(__dirname, '..','..', 'tmp', 'upload'),
   storage: multer.diskStorage({
       destination: (req, file, cb) => {
        cb(null,path.resolve(__dirname, '..','..', 'tmp', 'upload'));
       },
       //para nao ocorrer do caso de arquivos terem o mesmo nome e sobrepor
       filename:(req, file, cb) =>{
           crypto.randomBytes(16, (err,hash) =>{
               if(err) cb(err);

               const fileName = `${hash.toString('hex')}-${file.originalname}`;

               cb(null, fileName);
           });
       },

   }),
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