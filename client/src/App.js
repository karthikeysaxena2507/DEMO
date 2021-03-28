import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Resturants from "./Pages/Resturants";
import MyResturant from "./Pages/MyResturant";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Error from "./Pages/Error";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";
import Menu from "./Pages/Menu"

const App = () => {
  return (
    <Router>
      <Switch>
      {/* PROTECTED */}
        <Route exact path = "/create" component = {Create} />
        <Route exact path = "/myresturant/:id" component = {MyResturant} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/edit/:id" component = {Edit} />
      {/* PROTECTED */}
      {/* GENERAL */}
        <Route exact path = "/" component = {Resturants} />
        <Route exact path = "/menu/:id" component = {Menu} />
        <Route path="*" component={Error} />
      {/* GENERAL */}
      </Switch>
    </Router>
  );
}
export default App;
