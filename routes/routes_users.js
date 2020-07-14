const router = require('express').Router();
let User = require('../models/modelUser');

router.get('/', function (req, res) {
  console.log("Reached before user find");
      User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Erro: ' + err));
    console.log("user");
});


  router.route('/add_user').post((req, res) => {

   
    const mail = req.body.mail;
    const password = req.body.password;
    const type= req.body.type;

   
  
    const newuser = new User({
        mail,
        password,
        type,
    });
  
    newuser.save()
      .then(() => res.json('User Adicionado!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/:rsolo').get((req, res) => {
    User.findById(req.params.r_solo)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
      console.log("Reaching this");
  }
  );


  router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User Apagada.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });



    module.exports = router;