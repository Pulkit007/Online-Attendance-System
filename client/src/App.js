import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing/Landing";
import Choose from "./components/auth/Choose";
import FacultyLogin from "./components/auth/faculty/Login";
import StudentLogin from "./components/auth/student/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Choose} />
            <Route exact path="/register" component={Choose} />
            <Route exact path="/faculty/login" component={FacultyLogin} />
            <Route exact path="/student/login" component={StudentLogin} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
