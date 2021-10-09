import Banner from "./Banner";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Account from "./Account";
import Messages from "../pages/messages";
import logo from "../assets/icon.png";
import "../styles/app.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Banner>
        <div className="gpm-ban">
          <img src={logo} alt="logo-Groupomania" className="gpm-logo" />
          <h1 className="gpm-title">Bienvenue sur Groupomania</h1>
        </div>
        <Router>
          <div>
            <nav className="gpm-banend">
              <ul className="gpm-navi">
                <button className="gpm-link">
                  <Link to="/">Accueil</Link>
                </button>
                <button className="gpm-link">
                  <Link to="/connexion">Connexion</Link>
                </button>
                <button className="gpm-link">
                  <Link to="/inscription">Inscription</Link>
                </button>
                {/* <button className="gpm-link">
                  <Link to="/messages">Messages</Link>
                </button> */}
                <button className="gpm-link">
                  <Link to="/account">Compte</Link>
                </button>
              </ul>
            </nav>

            <Switch>
              {/* <Route path="/messages">
                <Messages />
              </Route> */}
              <Route path="/connexion">
                <Connexion />
              </Route>
              <Route path="/account">
                <Compte />
              </Route>
              <Route path="/inscription">
                <Inscription />
              </Route>
              <Route path="/">
              <Messages />
              </Route>
            </Switch>
          </div>
        </Router>
      </Banner>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </div>
  );
}

// function Home() {
//   useEffect(() => {
//     document.title = "Groupomania: Accueil";
//   });
//   return <div></div>;
// }

function Connexion() {
  useEffect(() => {
    document.title = "Groupomania: Connexion";
  });
  return (
    <div className="gpm-signIn">
      <SignIn></SignIn>
    </div>
  );
}

function Inscription() {
  useEffect(() => {
    document.title = "Groupomania: Inscription";
  });
  return (
    <div className="gpm-signUp">
      <SignUp></SignUp>
    </div>
  );
}

function Compte() {
  useEffect(() => {
    document.title = "Groupomania: Compte";
  });
  return (
    <div className="gpm-account">
      <Account></Account>
    </div>
  );
}

export default App;
