import React from "react";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
