import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing/Landing";
import Choose from "./components/auth/Choose";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Choose} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
