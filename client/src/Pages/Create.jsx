/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import axios from "axios";

const Home = () => {

    const [username, setUsername] = useState("kara");
    const [loading, setLoading] = useState(true);
    const [owner, setOwner] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [about, setAbout] = useState("");
    const [resturantType, setResturantType] = useState("Select");
    const [cuisine, setCuisine] = useState("");
    const [opensAt, setOpensAt] = useState("");
    const [closesAt, setClosesAt] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [id, setId] = useState(null);

    useEffect(() => {
        const check = async() => {
            try {
                const result = await axios.get("/resturants/check");
                if(result.data === "DNE") setId(null);
                else {
                    setId(result.data);
                    alert("You Have Already Added a resturant");
                    window.location = `/myresturant/${result.data}`;
                }
                const renewAccessToken = async() => {
                    const response = await axios.get("/users/auth");
                    if(response.data === "INVALID") {
                        clearInterval(interval);
                        window.location = "/login";
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
                    window.location = "/login";
                }
                renewAccessToken();
                setLoading(false);
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
    
    const add = async() => {
        try {
            const data = {
                username,
                name,
                owner,
                city,
                state,
                address,
                about,
                resturantType,
                cuisine,
                opensAt,
                closesAt,
                createdAt
            };
            const response = await axios.post("/resturants/add", data);
            window.location = `/myresturant/${response.data.id}`;
        }
        catch(error) {
            console.log(error);
        }
    }

    return (loading) ? <Loader /> :
    (<div>
        <Navbar username = {username} id = {id}/>
        <div className="upper-margin text-center container">
            <Header username = {username} />
            <h3> Add Your Resturant </h3>
            <div className="mt-3 text-left">
                <b> Name of Resturant </b>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Resturant's Name" 
                    autoComplete="off" 
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <div className="mt-3 text-left">
                <b> Resturant Owner's Name </b>
                <input 
                    type="text" 
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Owner" 
                    autoComplete="off" 
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <div className="mt-3 text-left">
               <b> Address </b>
                <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address of Resturant" 
                    autoComplete="off" 
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <div className="row mt-3 text-left">
                <div className="col-sm-6 mt-2">
                    <b> City </b>
                    <input 
                        type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div className="col-sm-6 mt-2">
                    <b> State </b>
                    <input 
                        type="text" 
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
            </div>
            <div className="row mt-3 text-left">
                <div className="col-sm-6 mt-2">
                   <b> Cuisine </b> 
                    <input 
                        type="text" 
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        placeholder="Cuisine" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div className="col-sm-6 dropdown mt-2">
                    <b>Select Resturant Type</b>
                    <br />
                    <button style={{border: "2px solid black", width: "100%", textAlign: "left", backgroundColor: "white"}} className="btn dropdown-toggle mt-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {resturantType}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setResturantType(e.target.innerText)}}> Vegetarian </a>
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setResturantType(e.target.innerText)}}> Non Vegetarian </a>
                        <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setResturantType(e.target.innerText)}}> Vegetarian and Non-Vegetarian  </a>
                    </div>
                </div>
            </div>
            <div className="row mt-3 text-left">
                <div className="col-sm-4 mt-2">
                    <b>Daily Opening Time of Resturant</b>
                    <input 
                        type="time" 
                        value={opensAt}
                        onChange={(e) => setOpensAt(e.target.value)}
                        placeholder="Opens At" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div className="col-sm-4 mt-2">
                    <b>Daily Closing Time of Resturant</b>
                    <input 
                        type="time" 
                        value={closesAt}
                        onChange={(e) => setClosesAt(e.target.value)}
                        placeholder="Closes At" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div className="col-sm-4 mt-2">
                   <b> From When did Resturant Started</b>
                    <input 
                        type="date" 
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        placeholder="Date of Starting of Resturant" 
                        autoComplete="off" 
                        className="pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
            </div>
            <div className="mt-3 text-left">
               <b> About Your Resturant</b>
                <textarea
                    type="text" 
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="A short description of your resturant" 
                    autoComplete="off" 
                    rows={5}
                    cols={110}
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <button type="button" className="btn btn-dark mt-3" onClick={() => add()}> ADD </button>
        </div>
        <Footer />
    </div>
    );
}

export default Home;