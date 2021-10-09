const Message = require("../models/message");
const Comment = require("../models/comment");
const fs = require("fs");

/* Create a message */
exports.createMessage = (req, res) => {
  if (!req.file) {
    const message = new Message({
      user_id: req.body.user_id,
      title: req.body.title,
      message: req.body.message,
      image: " ",
    });
    Message.create(message, (err, data) => {
      if (err) res.status(500).json({ message: "Message non créé !" });
      else res.send(data);
    });
  } else {
    const message = new Message({
      user_id: req.body.user_id,
      title: req.body.title,
      message: req.body.message,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    Message.create(message, (err, data) => {
      if (err) res.status(500).json({ message: "Message non créé !" });
      else res.send(data);
    });
  }
};

/* Remove a message */
exports.deleteMessage = (req, res) => {
  Message.findById(req.params.id, (err, messages) => {
    const filename = messages[0].image.split(
      "http://localhost:8080/images/"
    )[1];
    if (filename == null) {
      console.log("Pas d'image");
      Message.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "Non trouvé !") {
            res.status(404).json({
              message: "Message introuvable avec l'id : " + req.params.id,
            });
          } else {
            res.status(500).json({
              message: "Message introuvable avec l'id : " + req.params.id,
            });
          }
        } else res.json({ message: "Message supprimé avec succès !" });
      });
    } else {
      fs.unlink(`images/${filename}`, () => {
        Message.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "Non trouvé !") {
              res.status(404).json({
                message: "Message introuvable avec l'id : " + req.params.id,
              });
            } else {
              res.status(500).json({
                message: "Message introuvable avec l'id : " + req.params.id,
              });
            }
          } else res.json({ message: "Message supprimé avec succès !" });
        });
      });
    }
  });
};

/* Get one particular message and its comment(s) */
exports.findOneMessage = (req, res) => {
  Message.findById(req.params.id, (err, messages) => {
    if (err) {
      res.status(500).send({ message: "Aucun message trouvé !" + err });
    } else {
      Comment.getAll((err, comments) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Aucun commentaires trouvés !" + err });
        } else {
          comments.forEach((comment) => {
            if (messages[0].message_id === comment.message_id) {
              messages[0].comments.push(comment);
            }
          });
        }
        res.send(messages);
      });
    }
  });
};

/* Get all messages and comments */
exports.getAllMessages = (req, res) => {
  Message.getAll((err, messages) => {
    if (err)
      res.status(500).send({ message: "Aucun messages trouvés !" + err });
    else {
      Comment.getAll((err, comments) => {
        if (err) {
          res
            .status(500)
            .send({ message: "Aucun commentaires trouvés !" + err });
        } else {
          comments.forEach((comment) => {
            let message = messages.find(
              (elt) => elt.message_id === comment.message_id
            );
            message.comments.push(comment);
          });
          res.send(messages);
        }
      });
    }
  });
};
