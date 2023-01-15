const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Thing = require('./models/Thing.js');


const app = express();



mongoose.connect('mongodb+srv://eulali:*****@cluster0.uhtueec.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
  app.use(bodyParser.json());

  app.post('/api/stuff', (req, res) => {
      delete req.body._id;
      const thing = new Thing(req.body);
      thing.save(err=>{
        if (err) resp.status(500).send(err);
        else resp.send(thing);
      })
        //.then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        //.catch(error => res.status(400).json({ error }));
    });



app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

  

app.get('/api/stuff', (req, res, next) => {
  Thing.find()
  .then(Things => res.status(200).json(Things))
  .catch(error => res.status(400).json({ error }));
  });

  

module.exports = app;
