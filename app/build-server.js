const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const jwtServices = require('./utils/jwt-services');


/**
 *
 * @param req c'est le request la requette http
 * @param res c'est hhtp response c'est la ou en envoie la réponse
 * @param next  c'est une fonction qui permet de chaine le routage (de chainé vers l'api suivante
 *
 *
 */
function authentication(req, res, next) {
  console.log("################ Authentication ###############");
  ///vérifie que c'est bien la page d'authentification
  console.log('# ' + req.url);
  if (req.url == "/login") {
    next();
  }
  else {
    /// si on est deja authentifié et quil y a des choses dans le token que je dois ouvrir lire et vérifié.
    var token = req.headers["token"];
    var verif = jwtServices.verify(token);
    console.log("VERIF >> " + JSON.stringify(verif));
    ///on vérifie si le token est vérifié ou pas : (on a bien pu le décrypté) (verif --> c'est le token décrypté)
    if (verif) {
      next();
    }
    else {
      res.status(401).json({result : "Utilisateur non authentifié!"});
    }
  }
}

module.exports = (cb) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(cors());
  app.use(bodyParser.json({}));
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));
  /**
   * Ici Authentification commme paramètre ici on a intercallé les execution cela veut dire qu'on exuécute l'authentification avant le routage de nimporte quelle api
   */
  app.use('/api', authentication, api);
  app.use('*', (req, res) => res.status(404).end());
  const server = app.listen(process.env.PORT || 9428, () => cb && cb(server));
};


