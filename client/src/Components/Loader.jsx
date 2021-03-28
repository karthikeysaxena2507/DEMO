import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (<div className="text-center" style={{marginTop: "320px"}}>
    <Spinner animation="border" className="mr-2" variant="primary" />
    </div>);
}

export default Loader;