const router = require('express').Router();
let Eletrodo = require('../models/modelEletrodo');
let Measure = require('../models/modelMeasure');




router.get('/', function (req, res) {
  console.log("Reached before eletrodo find");
      Eletrodo.find()
    .then(eletrodo => res.json(eletrodo))
    .catch(err => res.status(400).json('Erro: ' + err));
    console.log("Reached after eletrodo find");
});

   
router.route('/add').post((req, res) => {

    const idsolo = req.body.idsolo;
    const solo = req.body.solo;
    const resistividade = req.body.resistividade;
    const coordenadas = req.body.coordenadas;
  
    const newsoil = new Eletrodo({
        idsolo,
        solo,
        resistividade,
        coordenadas
    });
  
    newsoil.save()
      .then(() => res.json('Soil added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

    module.exports = router;