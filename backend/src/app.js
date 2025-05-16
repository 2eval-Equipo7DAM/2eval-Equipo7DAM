//Se cargan las librerias
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const gpu = require('./route/gpu');

//Iniciamos la aplicación (Backend)
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', gpu);

app.listen(8080, () => {
    console.log("El backend ha iniciado correctamente en el puerto 8080");
});

module.exports = { app };