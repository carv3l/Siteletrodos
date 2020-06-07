Eletrodo = require('../Backend/models/eletrodo.model');

exports.index = function (req, res) {
    Produto.get(function (err, produtos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: produtos
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var dbeletrodo = new Eletrodo();
    dbeletrodo.idsolo = req.body.idsolo ? req.body.idsolo : dbeletrodo.idsolo;
    dbeletrodo.solo = req.body.solo;
    dbeletrodo.resistividade = req.body.resistividade;
    dbeletrodo.coordenadas = req.body.coordenadas;
      
    dbeletrodo.save()
    .then(() => res.json({message: 'Novo Eletrodo Adicionado!',data: dbeletrodo}))
    .catch(err => res.status(400).json('Erro: '+ err));    
    console.log(dbeletrodo);    
    
}



// Handle view contact info
exports.view = function (req, res) {
    Produto.findById(req.params.produtos_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Detalhes do Produto carregar..',
            data: dbproduto
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Produto.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Informaçao do Produto Atualizada',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Produto.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "Sucesso",
            message: 'Produto Apagado'
        });
    });
};