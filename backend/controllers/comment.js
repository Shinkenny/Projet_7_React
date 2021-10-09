const Comment = require('../models/comment');

// Post a comment
exports.createComment = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: 'Erreur !' })
    }
    const comment = new Comment({
        commentaire: req.body.commentaire,
        user_id: req.body.user_id,
        message_id: req.body.message_id,
    });
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).json({ message: 'Commentaire non créé !' })
        else res.send(data);
    });
}

// Get all comments
exports.findAllComments = (req, res) => {
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({ message: "Commentaire non trouvé" + err });
        else res.send(data);
    });
};

// Delete a specific comment
exports.deleteComment = (req, res) => {
    Comment.remove(req.params.id, (err, data) => {
        console.log(req.params.id);
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Commentaire introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Commentaire introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Commentaire supprimé avec succès !' })
    })
}