import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = (props) => {

    const username = props.username;

    const logout = async() => {
        try {
            await axios.post("/users/logout", {username});
            window.location = "/";
        }
        catch(err) {
            console.log(err);
        }
    }

    return <div className="text-center">
    <nav className="navbar navbar-expand-md navbar-light bg-dark text-white fixed-top" id="bar">
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"> </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav">
        <Link to="/">
          <span 
            className={"nav-item nav-link active expand " + ((props.page === "home") ? "nav-item-active" : "")}> 
            Home 
        </span>
        </Link>
        <Link to="/login">
          <span 
            className={"nav-item nav-link active expand " + ((props.page === "about") ? "nav-item-active" : "")}> 
            Login
          </span>
        </Link>
        <Link to={"/myresturant/" + props.id}>
          <span 
            className={"nav-item nav-link active expand " + ((props.page === "myresturant") ? "nav-item-active" : "")} 
            style={(props.id === null) ? {display: "none"} : null}>
            My Resturant
          </span>
        </Link>
        <Link to="/create">
          <span 
            className={"nav-item nav-link active expand " + ((props.page === "create") ? "nav-item-active" : "")}
            style={(props.id !== null) ? {display: "none"} : null}> 
            Add Resturant 
          </span>
        </Link>
          <span 
            onClick={logout} 
            style={(username === null) ? {display: "none"} : null}
            className={"nav-item nav-link active expand"}
            > Logout </span>
        </div>
      </div>
    </nav>
  </div>
}

export default Navbar;