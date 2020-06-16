const router = require('express').Router();
let Eletrodo = require('../models/modelEletrodo');

router.get('/', function (req, res) {
<<<<<<< HEAD
      Eletrodo.find()
    .then(eletrodo => res.json(eletrodo))
    .catch(err => res.status(400).json('Error: ' + err));
=======
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
>>>>>>> 3acc2accef591483190f3a7d7af07ea98737e7ac
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