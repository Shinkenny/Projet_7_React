const sql = require('../connexion');

const Message = function (m) {
    this.message_id = m.id,
    this.user_id = m.user_id,
    this.prenom = m.prenom,
    this.title = m.title,
    this.message = m.message,
    this.comments = m.comments ? m.comments : [],
    this.createdAt = m.createdAt,
    this.image = m.image
};

// Create a new message
Message.create = (newMessage, result) => {
    sql.query(`INSERT INTO messages (user_id, title, message, createdAt, image) VALUES ("${newMessage.user_id}","${newMessage.title}","${newMessage.message}", Now(), "${newMessage.image}")`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du message : ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage });
    });
};

// Get a specific message
Message.findById = (messageId, result) => {
    sql.query(`SELECT * FROM messages m inner join user u on u.id=m.user_id WHERE m.id = ${messageId}`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            if (res, messageId) {
                let messages = [];
                messages = res.map(element => {
                    let topic = new Message(element)
                    topic.author = {
                        prenom: element.prenom,
                    }
                    return topic;
                })
                console.log("Message trouvé ! : ", messages);
                result(null, messages);
                return;
            }
            result({ kind: "Non trouvé" }, null);
        })
};

// Get all messages
Message.getAll = result => { 
    sql.query("SELECT m.id, m.user_id, u.prenom, m.title, m.message, m.createdAt, m.image FROM messages m inner join user u on u.id=m.user_id ORDER BY createdAt DESC", (err, res)=>{
        if (err) {
            console.log("erreur: ", err);
            return;
        }
        let messages = [];
        res.map(element => {
            let topic = new Message(element);
            messages.push(topic);
        });
       result(null, messages);
    });
};

// Delete message by ID
Message.remove = (Id, result) => {
    sql.query("DELETE FROM messages WHERE id = ?", Id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression du message avec l'id : ", Id);
        result(null, res);
    });
};

module.exports = Message;