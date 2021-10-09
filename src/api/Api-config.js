import axios from "axios";

const URL = "http://localhost:8080/api/";
const ApiConfig = {
  signup(nom, prenom, email, password) {
    return axios.post(URL + "auth/signup", {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
    });
  },

  login(email, password) {
    return axios.post(URL + "auth/login", {
      email: email,
      password: password,
    });
  },

  getAllMessage() {
    return axios.get(URL + "message/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getAllComment() {
    return axios.get(URL + "comment/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getAllUsers() {
    return axios.get(URL + "auth/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getOneMessage(message) {
    return axios.get(URL + `message/${message}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getOneUser(userId) {
    return axios.get(URL + `auth/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  deleteUser(id) {
    return axios.delete(URL + `auth/user/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  createMessage(formData) {
    return axios.post(URL + "message/create", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
  },

  removeMessage(message) {
    return axios.delete(URL + `message/${message}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  createComment(commentaire, messageId) {
    return axios.post(
      URL + "comment/create",
      {
        commentaire: commentaire,
        message_id: messageId,
        user_id: localStorage.getItem("userId"),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  removeComment(comment) {
    return axios.delete(URL + `comment/${comment}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  getAllLikes() {
    return axios.get(URL + "likes/getAll", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  addLike(messageId) {
    return axios.post(
      URL + "likes/create",
      {
        message_id: messageId,
        user_id: localStorage.getItem("userId"),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  removeLike(like) {
    console.log(like);
    return axios.delete(URL + `likes/${like.id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default ApiConfig;
