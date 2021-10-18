import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import ApiConfig from "../api/Api-config";
import React, { useEffect, useState } from "react";
import MyLoader from "../components/MyLoader";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MailIcon from "@material-ui/icons/Mail";
import RateReviewIcon from "@material-ui/icons/RateReview";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  rootPost: {
    maxWidth: "65%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  media: {
    height: 60,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandNewComment: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarSmall: {
    backgroundColor: red[500],
    height: 30,
    width: 30,
    marginTop: 12,
  },
  deleteSmall: {
    height: 30,
    width: 30,
    paddingTop: 28,
  },
  avatarPost: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  submit2: {
    margin: theme.spacing(2, 1, 0, 1),
  },
  commentBox: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    alignItems: "top",
    paddingRight: 5,
    paddingLeft: 10,
    borderBottom: "5px solid white",
  },
  commentName: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  comment: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
  },
}));

//Messages management
export default function Messages() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(-1);
  const [newComment, setNewComment] = useState(-1);
  const [posts, setPost] = useState([]);
  const [comments, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tokenState, setTokenState] = useState(false);
  const token = localStorage.getItem("token");
  let history = useHistory();

  //Check if authentification token is still valid
  const tokenIsValid = (token) => {
    if (token === "" || token == null) {
      console.log("Invalid jwt token");
    } else {
      const decoded = jwt_decode(token);
      const now = Date.now() / 1000;
      const expiry = decoded.exp;
      const tokenIsValid = now <= expiry;
      setTokenState(tokenIsValid);
    }
  };

  //Handle expanded state to see the comments
  const handleCommentClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  //Handle state to write a comment
  const handleNewComment = (i) => {
    setNewComment(newComment === i ? -1 : i);
    setNewComMessId(i);
    setNewCommentaire("");
  };

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [newCommentaire, setNewCommentaire] = useState("");
  const [newComMessId, setNewComMessId] = useState("");
  const [file, setFile] = useState("");
  const [isFileSelected, setIsSelected] = useState(false);
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

  //Delete a message
  const handleDelete = (i) => {
    ApiConfig.removeMessage(i)
      .then(() => {
        setLoading(true);
        toast.info("Message effacé !");
        ApiConfig.getAllMessage().then((response) => {
          setPost(response.data);
          setLoading(false);
          setIsSelected(false);
          setFile("");
        });
      })
      .catch(() => {
        toast.error("Une erreur s'est produite !");
      });
  };

  //Delete a comment
  const handleDeleteComment = (i) => {
    ApiConfig.removeComment(i)
      .then(() => {
        toast.info("Commentaire effacé !");
        ApiConfig.getAllComment().then((response2) => {
          setComment(response2.data);
        });
      })
      .catch(() => {
        toast.error("Une erreur s'est produite !");
      });
  };

  //Handle image selection
  function changeHandler(e) {
    let newFile = e.target.files[0];
    if (newFile === "" || newFile == null) {
      setFile("");
    } else {
      setFile(e.target.files[0]);
      setIsSelected(true);
    }
    e.target.value = null;
  }

  //Redirect user to inscription page
  function GoToSignUp(e) {
    e.preventDefault();
    history.push("/inscription");
  }

  //Redirect user to connexion page
  function GoToLogin(e) {
    e.preventDefault();
    history.push("/connexion");
  }

  //Post a new message
  function SendMessage(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("file", file);
    formData.append("user_id", userId);
    if (title === "") {
      toast.error("Il faut indiquer un titre !");
    }
    if (message === "") {
      toast.error("Un message ne peut pas être vide !");
    }
    if (title !== null && title !== "" && message !== null && message !== "") {
      ApiConfig.createMessage(formData)
        .then(() => {
          setLoading(true);
          toast.success("Message posté !");
          ApiConfig.getAllMessage().then((response) => {
            setPost(response.data);
            setLoading(false);
            setTitle("");
            setMessage("");
            setIsSelected(false);
            setFile("");
          });
        })
        .catch(() => {
          toast.error("Une erreur s'est produite !");
        });
    }
  }

  //Post a new comment
  function SendComment(e) {
    e.preventDefault();
    if (newCommentaire === "") {
      toast.error("Un commentaire ne peut pas être vide !");
    }
    if (newCommentaire !== null && newCommentaire !== "") {
      ApiConfig.createComment(newCommentaire, newComMessId)
        .then(() => {
          toast.success("Commentaire posté !");
          ApiConfig.getAllComment().then((response2) => {
            setComment(response2.data);
            setNewCommentaire("");
            setExpanded(newComMessId);
          });
        })
        .catch(() => {
          toast.error("Une erreur s'est produite !");
        });
    }
  }

  useEffect(() => {
    ApiConfig.getAllMessage().then((response) => {
      document.title = "Groupomania: Messages";
      setPost(response.data);
      setLoading(false);
    });
    ApiConfig.getAllComment().then((response2) => {
      setComment(response2.data);
    });
  }, []);

  useEffect(() => {
    tokenIsValid(token);
  }, [token]);

  return (
    <>
      {tokenState ? (
        <Container className={classes.rootPost}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatarPost}>
              <MailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Poster un nouveau message
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Titre du message"
                name="title"
                autoComplete="title"
                autoFocus
              />
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={3}
                autoComplete="Message"
              />
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={(e) => changeHandler(e)}
              />
              <label htmlFor="raised-button-file">
                <Button
                  fullWidth
                  variant="contained"
                  component="span"
                  color="default"
                  className={classes.submit}
                  startIcon={<CloudUploadIcon />}
                >
                  Ajouter une image
                </Button>
              </label>
              {isFileSelected ? (
                <div>
                  <p>{file.name}</p>
                </div>
              ) : (
                <p></p>
              )}
              <Button
                onClick={SendMessage}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                endIcon={<SendIcon />}
              >
                Envoyer
              </Button>
            </form>
          </div>
        </Container>
      ) : (
        <div>
          <Container className={classes.rootPost}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatarPost}>
                <MailIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Vous devez être connecté pour poster un message
              </Typography>
              <div className={classes.paper2}>
                <Button
                  onClick={GoToLogin}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit2}
                  endIcon={<SendIcon />}
                >
                  Connexion
                </Button>
                <Button
                  onClick={GoToSignUp}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit2}
                  endIcon={<SendIcon />}
                >
                  Inscription
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
      {loading ? (
        <div>
          <MyLoader />
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.message_id} className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="prenom" className={classes.avatar}>
                  {post.prenom.charAt(0)}
                </Avatar>
              }
              title={post.title}
              subheader={post.createdAt}
            />
            {post.image === " " || post.image == null ? (
              <div>
                <CardMedia image={post.image} title={post.title} />
              </div>
            ) : (
              <div>
                <CardMedia
                  className={classes.media}
                  image={post.image}
                  title={post.title}
                />
              </div>
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.message}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="Ecrire un commentaire"
                className={clsx(classes.expandNewComment, {
                  [classes.expandOpen]: newComment === post.message_id,
                })}
                onClick={() => handleNewComment(post.message_id)}
                aria-expanded={newComment === post.message_id}
                id={post.message_id}
              >
                <RateReviewIcon />
              </IconButton>
              <IconButton
                aria-label="Montrer le(s) commentaire(s)"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded === post.message_id,
                })}
                onClick={() => handleCommentClick(post.message_id)}
                aria-expanded={expanded === post.message_id}
                id={post.message_id}
              >
                <CommentIcon />
              </IconButton>
              {JSON.stringify(post.user_id) === userId || isAdmin === "1" ? (
                <IconButton
                  aria-label="Effacer le message"
                  onClick={() => handleDelete(post.message_id)}
                  id={post.message_id}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <p></p>
              )}
            </CardActions>
            <Collapse
              in={newComment === post.message_id}
              timeout="auto"
              unmountOnExit
            >
              {tokenState ? (
                <CardContent>
                  <Typography component="h1" variant="h6">
                    Poster un nouveau commentaire
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      onChange={(e) => setNewCommentaire(e.target.value)}
                      value={newCommentaire}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="outlined-multiline-static"
                      label="Commentaire"
                      multiline
                      rows={2}
                      autoComplete="Commentaire"
                    />
                    <Button
                      onClick={SendComment}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      endIcon={<SendIcon />}
                    >
                      Envoyer
                    </Button>
                  </form>
                </CardContent>
              ) : (
                <div>
                  <Container className={classes.rootPost}>
                    <CssBaseline />
                    <div className={classes.paper}>
                      <Avatar className={classes.avatarPost}>
                        <CommentIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Vous devez être connecté pour poster un commentaire
                      </Typography>
                      <div className={classes.paper}>
                        <Button
                          onClick={GoToLogin}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit2}
                          endIcon={<SendIcon />}
                        >
                          Connexion
                        </Button>
                        <Button
                          onClick={GoToSignUp}
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit2}
                          endIcon={<SendIcon />}
                        >
                          Inscription
                        </Button>
                      </div>
                    </div>
                  </Container>
                </div>
              )}
            </Collapse>
            <Collapse
              in={expanded === post.message_id}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography>
                  {comments.map(
                    (comment) =>
                      comment.message_id === post.message_id && (
                        <div key={comment.id} className={classes.commentBox}>
                          <Avatar
                            aria-label="prenom"
                            className={classes.avatarSmall}
                          >
                            {comment.prenom.charAt(0)}
                          </Avatar>
                          <p className={classes.commentName}>
                            {comment.prenom}
                          </p>
                          <p className={classes.comment}>
                            {comment.commentaire}
                          </p>
                          {JSON.stringify(comment.user_id) === userId ||
                          isAdmin === "1" ? (
                            <IconButton
                              aria-label="Effacer le message"
                              onClick={() => handleDeleteComment(comment.id)}
                              id={comment.id}
                              className={classes.deleteSmall}
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      )
                  )}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))
      )}
    </>
  );
}
