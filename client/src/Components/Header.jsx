import React from "react";

const Heading = (props) => {

    return (<div className="text-center upper-margin">
        <h1 className="main margin"> <i>Foodelicious</i> </h1>
        {(props.username === null) && <p> Note: You Must be logged In to Add/Edit your Resturant </p>}
    </div>);
} 

export default Heading;