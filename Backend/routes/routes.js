const router = require('express').Router();
let Eletrodo = require('../models/modelEletrodo');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
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
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

    module.exports = router;