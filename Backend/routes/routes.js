const router = require('express').Router();
const cEletrodos = require('../C')

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

    router.route('/solo')
    .post(c);

    module.exports = router;