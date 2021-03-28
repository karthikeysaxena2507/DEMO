/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import trash from "../images/trash.png";

const Item = (props) => {
    return (
    <div className="dish" style={(props.name === undefined) ? {display: "none"} : null}>
        {props.name} ({props.quantity}) 
        <span style={{float: "right"}}> 
            <b> Rs {props.amount} </b> 
            <img src={trash} onClick={props.change} className="img expand mr-2"/>
        </span>
    </div>);
}

export default Item;