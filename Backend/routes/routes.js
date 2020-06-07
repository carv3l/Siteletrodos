const router = require('express').Router();
let Eletrodo = require('../models/eletrodo.model');

router.route('/').get((req, res) => {
        eletrodos.get(function (err, eletrodo) {
            if (err) {
                res.json({
                    status: "Error",
                    message: err,
                });
            }
            res.json({
                status: "Success",
                message: "E Retrieved successfully",
                data: eletrodo
            });
        });

    });

    router.route('/add').post((req, res) => {
        var dbeletrodo = new Eletrodo();

        dbeletrodo.idsolo = req.body.idsolo;
        dbeletrodo.solo = req.body.solo;
        dbeletrodo.resistividade = req.body.resistividade;
        dbeletrodo.coordenadas = req.body.coordenadas;
      
        
        dbeletrodo.save()
        .then(() => res.json({message: 'Novo Eletrodo Adicionado!',data: dbeletrodo}))
        .catch(err => res.status(400).json('Erro'+ err));    
        console.log(dbeletrodo);    
        
    });

    module.exports = router;