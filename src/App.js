import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import LeaguePage from "./containers/LeaguePage/LeaguePage";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/league/:code/:name" component={LeaguePage} />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
