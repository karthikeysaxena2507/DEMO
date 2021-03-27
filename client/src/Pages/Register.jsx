import React, { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const check = async() => {
            try {
                const response = await axios.get("/users/auth");
                (response.data !== "INVALID") && (window.location = "/home");
            }
            catch(err) {
                console.log(err);
            }
        }   
        check(); 
    },[]);


    const add = async() => {
        try {
            const response = await axios.post("/users/register", {username, email, password});
            if(response.data === "Username Already Exists") setMessage(response.data);
            else if(response.data === "Email Already Exists") setMessage(response.data);
            else window.location = "/";
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
    <div className="text-center up">
    <h2> Register Your Account </h2>
    <div>
        <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" 
            autoComplete="off" 
            className="mt-3 pt-2 pb-2 pr-2 pl-2"
            required 
        />
    </div>
    <div>
        <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            autoComplete="off" 
            className="mt-3 pt-2 pb-2 pr-2 pl-2"
            required 
        />
    </div>
    <div>
        <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            className="mt-3 pt-2 pb-2 pr-2 pl-2"
            required 
        />
    </div>
    <div>
        <button onClick={() => add()} className="btn btn-dark mt-3 mb-3"> Register </button>
    </div>
    <h4> OR </h4>
    <div>
        <button onClick={() => window.location="/"} className="btn btn-dark mt-3"> Login </button>
    </div>
    <div className="mt-3">
        <p> {message} </p>
    </div>
</div>
    )
}

export default Register;