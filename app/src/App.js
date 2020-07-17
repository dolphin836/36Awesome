import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Page/Home';
import SignUp from './Page/SignUp';
import SignIn from './Page/SignIn';
import Account from './Page/Account/Account';
import AccountPassword from './Page/Account/Password';
import AccountBind from './Page/Account/Bind';
import AccountMail from './Page/Account/Mail';
import './App.sass';

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/account" component={Account} />
      <PrivateRoute exact path="/account/password" component={AccountPassword} />
      <PrivateRoute exact path="/account/bind" component={AccountBind} />
      <PrivateRoute exact path="/account/mail" component={AccountMail} />
    </Router>
  );
}
