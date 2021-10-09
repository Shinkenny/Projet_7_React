const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/* User creation */
exports.signup = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Erreur !" });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      let role = "0";
      if (req.body.isAdmin) {
        role = req.body.isAdmin;
      }
      const user = {
        email: req.body.email,
        password: hash,
        nom: req.body.nom,
        prenom: req.body.prenom,
        isAdmin: role,
        createdAt: new Date(),
      };
      User.create(user, (err, data) => {
        if (err)
          res.status(500).json({ message: "Utilisateur non créé !" + err });
        else res.send(data);
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

/* User login authentification */
exports.login = (req, res, next) => {
  User.findOne(req.body.email, (err, user) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          res.status(401).json({ message: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "12h",
          }),
        });
      });
    }
  });
};

/* Get a specific user */
exports.findOne = (req, res, next) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Impossible de retrouver un utilisateur avec cet id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Une erreur est survenue sur cet id ${req.params.id}.`,
        });
      }
    } else res.send(data);
  });
};

/* Get all users */
exports.findAll = (req, res, next) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Une erreur est survenue.",
      });
    else res.send(data);
  });
};

/* Delete an user */
exports.delete = (req, res, next) => {
  User.remove(req.params.id, (err, data) => {
    console.log(req.params.id);
    if (err) {
      if (err.kind === "Non trouvé !") {
        res
          .status(404)
          .json({
            message: "Utilisateur introuvable avec l'id : " + req.params.id,
          });
      } else {
        res
          .status(500)
          .json({
            message: "Utilisateur introuvable avec l'id : " + req.params.id,
          });
      }
    } else res.json({ message: "Utilisateur supprimé avec succès !" });
  });
};
