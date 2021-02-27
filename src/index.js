require('dotenv').config();
const express = require('express'); // importação do express
const mongoose = require('mongoose'); 

const app = express();// instanciando o expression

mongoose.connect('mongodb://localhost:27017/imagens', { 
    useNewUrlParser:true, useUnifiedTopology: true });

app.use(express.json());//utilizar requisiçoes com json no express
app.use(express.urlencoded({ extended: true}));
//app.use(morgan('dev'));

app.use(require("./rotas"));// uso do arquivo rota criado

app.listen(3333); //porta usada 