import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Resturants from "./Pages/Resturants";
import MyResturant from "./Pages/MyResturant";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Create from "./Pages/Create";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = "/" component = {Resturants} />
        <Route exact path = "/myresturant" component = {MyResturant} />
        <Route exact path = "/create" component = {Create} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
}
export default App;
