const mongoose = require('mongoose');


const ImgSchema = new mongoose.Schema({
    nome: String,
    tamanho: Number,
    key: String, 
    url: String,
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("ImgModel", ImgSchema);