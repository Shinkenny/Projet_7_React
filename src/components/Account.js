import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { red } from "@material-ui/core/colors";
import ApiConfig from "../api/Api-config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  rootPost: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  rootPost2: {
    maxWidth: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  paper2: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper3: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperSpacer: {
    marginLeft: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  submit2: {
    margin: theme.spacing(2, 1, 0, 1),
  },
  avatar: {
    backgroundColor: red[500],
    height: 50,
    width: 50,
  },
  avatarPost: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

//Account management
export default function Account() {
  const classes = useStyles();
  const forname = localStorage.getItem("prenom");
  const userId = localStorage.getItem("userId");
  const [userState, setUserState] = useState(false);
  let history = useHistory();

  const userIsLogged = (userId) => {
    if (userId === "" || userId == null) {
      console.log("Utilisateur non connecté");
    } else {
      setUserState(true);
    }
  };

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

  //Disconnect user
  function DecoAccount(e) {
    e.preventDefault();
    localStorage.clear();
    setUserState(false);
    toast.success("Vous vous êtes bien déconnecté !");
  }

  //Delete user account
  function DeleteAccount(e) {
    e.preventDefault();
    ApiConfig.deleteUser(userId);
    localStorage.clear();
    history.push("/");
    toast.success("Compte effacé avec succès !");
  }

  useEffect(() => {
    userIsLogged(userId);
  }, [userId]);

  return (
    <>
      {userState ? (
        <Container className={classes.rootPost}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar aria-label="prenom" className={classes.avatar}>
              {forname.charAt(0)}
            </Avatar>
            <Typography
              className={classes.paperSpacer}
              component="h1"
              variant="h5"
            >
              Gestion du compte
            </Typography>
          </div>
          <div>
            <Button
              onClick={DecoAccount}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              endIcon={<LockOutlinedIcon />}
            >
              Se déconnecter
            </Button>
            <Button
              onClick={DeleteAccount}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              endIcon={<DeleteIcon />}
            >
              Effacer le compte
            </Button>
          </div>
        </Container>
      ) : (
        <div>
          <Container className={classes.rootPost2}>
            <CssBaseline />
            <div className={classes.paper3}>
              <Avatar className={classes.avatarPost}>
                <MailIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Vous devez être connecté pour accéder à votre espace utilisateur
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
    </>
  );
}
