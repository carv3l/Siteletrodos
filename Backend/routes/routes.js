const router = require('express').Router();
let eletrodos = require('../models/eletrodo.model');

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