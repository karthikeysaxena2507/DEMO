import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (<div className="text-center upper-margin">
    <Spinner animation="border" className="mr-2" variant="primary" />
    </div>);
}

export default Loader;