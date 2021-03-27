import React from "react";

const Error = () => {

    return (
    <div className="text-center up">
        <h1> Error 404: Page Not Found </h1>
        <div>
            <button onClick={() => window.location="/"} className="btn btn-dark mt-3 mb-3"> Login </button>
        </div>
        <h4> OR </h4>
        <div>
            <button onClick={() => window.location="/register"} className="btn btn-dark mt-3"> Register </button>
        </div>
    </div>)
}

export default Error;