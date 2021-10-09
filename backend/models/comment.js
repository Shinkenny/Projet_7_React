const sql = require('../connexion');

const Comment = function (c) {
    this.message_id = c.message_id,
    this.user_id = c.user_id,
    this.commentaire = c.commentaire,
    this.createdAt = new Date()
};

// Post a comment
Comment.create = (newComment, result) => {
    sql.query(`INSERT INTO commentaires (user_id, message_id, commentaire, createdAt) VALUES ("${newComment.user_id}","${newComment.message_id}","${newComment.commentaire}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du commentaire : ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
}


// Get all comments
Comment.getAll = result => {
    sql.query(`SELECT commentaires.id, commentaires.message_id, commentaires.commentaire, commentaires.createdAt, commentaires.user_id, user.prenom FROM commentaires INNER JOIN user ON commentaires.user_id = user.id ORDER BY createdAt DESC`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let comments = [];
        comments = res.map(element => {
            let content = new Comment(element)
            content.author = {
                prenom: element.prenom,
            }
            return comments;
        })
        result(null, res);
    });
};


// Delete a specific comment
Comment.remove = (id, result) => {
    sql.query("DELETE FROM commentaires WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Suppression du commentaire avec l'id: ", id);
        result(null, res);
    });
};

module.exports = Comment;