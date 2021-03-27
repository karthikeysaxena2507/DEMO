import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

    const [username, setUsername] = useState("");

    useEffect(() => {
        const check = async() => {
            try {
                const renewAccessToken = async() => {
                    const response = await axios.get("/users/auth");
                    if(response.data === "INVALID") {
                        clearInterval(interval);
                        window.location = "/";
                    }
                    else {
                        setUsername(response.data.username);
                        await axios.post("/users/accesstoken", {username: response.data.username});
                    }
                }
                const deleteRefreshToken = async() => {
                    const response = await axios.get("/users/auth");
                    if(response.data !== "INVALID") {
                        await axios.post("/users/logout", {username: response.data.username});
                    }
                    window.location = "/";
                }
                renewAccessToken();
                const interval = setInterval(() => renewAccessToken(), 10*60*1000); // 10 mins
                const timer = setTimeout(() => deleteRefreshToken(), 60*60*1000); // 1 hr
                return () => {
                    clearInterval(interval);
                    clearTimeout(timer);
                }
            }
            catch(err) {
                console.log(err);
            }
        }   
        check(); 
    },[]);
    
    const logout = async() => {
        try {
            await axios.post("/users/logout", {username});
            window.location = "/";
        }
        catch(err) {
            console.log(err);
        }
    }
    
    return (
    <div className="text-center up">
        <h1> This is the Profile page </h1>
        <button onClick={() => window.location="/home"} className="btn btn-dark mr-3 mt-3"> Home </button>
        <button onClick={() => logout()} className="btn btn-dark mr-3 mt-3"> logout </button>
    </div>
    );
}

export default Profile;