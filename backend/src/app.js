//Se cargan las librerias
const express = require('express');
const cors = require('cors');
const knex = require('knex');


//Iniciamos la aplicación (Backend)
const app = express();
app.use(cors());
app.use(express.json());

//Iniciar la BBDD
const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'hardware.db'                    
    },
    useNullAsDefault: true
});

const dbUser = knex ({
    client: 'sqlite3',
    connection: {
        filename: 'users.db'                  
    },
    useNullAsDefault: true
});

//CRUD
//Mostrar todas las GPUs disponibles
app.get('/gpu', async (req, res) => {
    const gpus = await db('GPU').select('*');
    res.status(200).json(gpus);
});

//Mostrar GPU por id en la URL
app.get('/gpu/:gpuId', async (req, res) => {
    const gpu = await db('GPU').select('*').where({ id: req.params.gpuId }).first();
    res.status(200).json(gpu);
});

//Añadir una nueva GPU
app.post('/gpu', async function(req, res) {
    await db('GPU').insert({
        Brand: req.body.Brand,
        Model: req.body.Model,
        Price: req.body.Price,
        Vram: req.body.Vram
    });
    res.status(201).json({ message: 'GPU created' });
});

//Modificar una GPU existente por ID
app.put('/gpu/:gpuId', async (req, res) => {
    await db('GPU').update({
        Brand: req.body.Brand,
        Model: req.body.Model,
        Price: req.body.Price,
        Vram: req.body.Vram
    }).where({id: req.params.gpuId});
    res.status(204).json({});
});

//Borrar una GPU existente
app.delete('/gpu/:gpuId', async (req, res) => {
    await db('GPU').del().where({ id: req.params.gpuId });
    res.status(204).json({});
});

//-----------------------------------------------------------------------------//


app.listen(8080, () => {
    console.log("El backend ha iniciado correctamente en el puerto 8080");
});

module.exports = { app };