import { connect } from "react-redux";
import PropTypes from "prop-types";

import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Nav";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import SignupContainer from "./containers/LoginContainer/SignupContainer";
import ProfileContainer from "./containers/ProfileContainer/ProfileContainer";
import LandingPageContainer from "./containers/LandingPageContainer/LandingPageContainer";

const App = props => (
  <BrowserRouter>
    <div className="container">
      <Navigation isAuthed={props.isAuthed} />
      <Switch>
        <Route exact path="/" component={LandingPageContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/signup" component={SignupContainer} />
        <Route exact path="/profile" component={ProfileContainer} />

        <Route render={() => <p>NOT FOUND!</p>} />
      </Switch>
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

App.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(App);
