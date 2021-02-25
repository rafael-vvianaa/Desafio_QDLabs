const express = require('express'); // importação do express

const app = express();// instanciando o expression

app.get('/', (request, response)=> {
    return res.send("ola");
});

app.listen(3000); //porta usada 