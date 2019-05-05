const { Router } = require('express');
const profile = require('../../models/profile.models')
const jwtServices = require('../../utils/jwt-services');

const router = new Router();

router.post('/', loginAction);

function loginAction(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(">> login : " + username + ", " + password);
    const user = validate(username, password);
    console.log((">> user : " + user))
    if (user == undefined) {
      res.status(401).json({result : "Utilisateur ou mot de passe non valide"});
    }
    else {
      console.log("connexion : " + user.id);

      var token = jwtServices.sign(user.email);
      console.log("TOKEN : " + token);
      console.log("------------------");
      var verif = jwtServices.verify(token);
      console.log("VERIF : " + JSON.stringify(verif));
      try {
          res.status(200).json({
            result : "Utilisateur authentifié",
            user : {
              id : user.id,
              firstName : user.firstName,
              lastName : user.lastName,
              email : user.email
            },
            token : token
          });
      } catch (err) {
        res.status(500).json(err);
      }
    }
}

function validate(username, password) {
  const user = profile.getByKey("username", username);
  if (user == undefined) {
    return undefined;
  }
  if (user.password === password) {
    return user;
  }
  return undefined;
}

module.exports = router;

