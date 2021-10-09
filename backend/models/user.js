const sql = require('../connexion');

const User = (user) => {
    this.email = user.email,
    this.password = user.password,
    this.nom = user.nom,
    this.prenom = user.prenom,
    this.isAdmin = user.isAdmin,
    this.createdAt = new Date()
};

// Create a new user
User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Utilisateur créé : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}

// Get user by ID
User.findById = (email, result) => {
    sql.query(`SELECT * FROM user WHERE id ='${email}'`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Non trouvé !" }, null);
    });
};

// Get a specific email
User.findOne = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email ='${email}'`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Utilisateur trouvé : ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Non trouvé !" }, null);
    });
};

// Get all users
User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// Delete user by ID
User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression de l'utilisateur avec l'id : ", id);
        result(null, res);
    });
};

module.exports = User;