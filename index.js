const express = require('express');
const api = express();
const mongoose = require('mongoose');

// Conectando ao banco de dados MongoDB
const URL_BD = 'mongodb+srv://liveaction:<1234>@liveaction.ax7sg.mongodb.net/?retryWrites=true&w=majority&appName=liveaction';
const portaApi = 3000;

mongoose.connect(URL_BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('API conectada ao BD!');
});

mongoose.connection.on('disconnected', () => {
    console.log('API foi desconectada do BD!');
});

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar no BD! ', erro);
});

// Endpoint de status
api.get('/status', (req, res) => {
    res.send('<h3>API Online!</h3>');
});

// Importando e utilizando o controlador
const consolesController = require('./controller/console.js');
api.get('/consoles', consolesController.listarConsoles);
api.post('/console', consolesController.adicionarConsole);
api.put('/console', consolesController.editarConsole);
api.delete('/console', consolesController.removerConsole);

// Inicializando a API
api.listen(portaApi, () => {
    console.log('API Online!');
});
