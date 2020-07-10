const router = require('express').Router();
let Measure = require('../models/modelMeasure');

router.get('/', function (req, res) {
  console.log("Reached before measure find");
      Measure.find()
    .then(measure => res.json(measure))
    .catch(err => res.status(400).json('Erro: ' + err));
    console.log("Reached after measure find");
});


  router.route('/add_measure').post((req, res) => {

    const espacamento = req.body.espacamento;
    const r_medido = req.body.rmedido;
    const r_solo = req.body.rsolo;
    const nota = req.body.nota;

  
    const newmeasure = new Measure({
        espacamento,
        r_medido,
        r_solo,
        nota
    });
  
    newmeasure.save()
      .then(() => res.json('Medida Adicionada!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
    module.exports = router;