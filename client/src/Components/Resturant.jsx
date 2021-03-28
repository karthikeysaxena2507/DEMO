/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

const Resturant = (props) => {
    return (
    <div className="row rest mt-4">
        <div className="col-md-6">
            <div> <h3> {props.name} </h3> </div>
            <i>{props.about}</i> <br />
            Location: {props.address} <br />
            {props.city}, {props.state} <br />
            Cuisine: {props.cuisine} <br />
            Type: {props.resturant_type} <br />
            OpensAt: {props.opensAt} <br />
            ClosesAt: {props.closesAt} <br />
            <Link to={"/menu/" + props.id} style={(props.hide) ? {display: "none"} : null}>
                See Menu and Estimate Bill
            </Link>            
        </div>
        <div className="col-md-6 text-center mt-3 mb-3">
            <img src = {props.imageUrl} style={{width: "300px", border: "2px solid black", borderRadius: "10px"}} />
        </div>
    </div>
    );
}

export default Resturant;