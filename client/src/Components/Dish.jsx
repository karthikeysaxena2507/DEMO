/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import trash from "../images/trash.png";
import plus from "../images/plus.png"

const Dish = (props) => {
    return (
    <div className="dish text-left">
        {(props.type === "Vegetarian") ? <span className="green"></span> : <span className="red"></span>} 
        <span className="ml-1"> {props.name} </span>
        <span style={{float: "right"}}> 
            <b className="mr-2"> Rs {props.price} </b> 
            <img src={trash} style={(props.hide) ? {display: "none"} : null} onClick={() => props.remove()} className="img expand mr-2"/>
            <img src={plus} onClick={() => props.add()} className="img expand"/>
        </span>
    </div>);
}

export default Dish;