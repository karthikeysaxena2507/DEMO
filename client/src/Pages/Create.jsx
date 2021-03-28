/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import axios from "axios";

const Create = () => {

    const [username, setUsername] = useState("");
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
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [percentage, setPercentage] = useState(0);
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

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log(reader.result);
            setImageUrl(reader.result);
        }
    }

    const add = async (e) => {
        try {
            setMessage("Adding your Restaurant, Please wait ...")
            const data = {
                data: imageUrl, username, name, owner, city, state, createdAt,
                address, about, resturantType, cuisine, opensAt, closesAt,
            };
            const options = {
                onUploadProgress: (ProgressEvent) => {
                    const { loaded, total } = ProgressEvent;
                    let percent = Math.floor( (loaded * 100) / total );
                    if(percent <= 100) {
                        setPercentage(percent-1);
                    }
                },
                headers: {"Content-type": "application/json"}
            }
            const response = await axios.post("/resturants/add", data, options);
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
            <form onSubmit={(e) => add(e)}>
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
                <div className="mt-4">
                    <div className="text-center">
                        <label for="file"> 
                            <span className="btn btn-dark mr-3"> Select Image </span>
                        </label>
                        <span className="text-center mt-2">
                            <span className="btn btn-dark" onClick={() => setImageUrl("")}> Remove Image </span> 
                        </span>
                    </div>
                    <input type="file" name="image" style={{display: "none"}} id="file" onChange={handleFileInputChange} />
                </div>
                <div className="mt-3 text-center"> Current Image </div>
                <div className="mt-1 text-center" style={(!imageUrl) ? {visibility: "visible"} : {visibility: "hidden"}}>
                    Image preview will be shown here
                </div>
                <div className="text-center">
                <img 
                    src={imageUrl} 
                    alt="invalid image" 
                    className="mt-2"
                    style={(imageUrl) ? {visibility: "visible", width: "300px", border: "2px solid black", borderRadius: "10px"} : {visibility: "hidden"}} 
                    />
                </div>
                <div className="text-center mt-2">
                <div className="text-center" style={{width: "50%", margin: "30px auto"}}>
                    { (percentage > 0) && <ProgressBar striped animated now={percentage} label={`${percentage}%`} />}
                </div>
                <div className="mt-2 mb-2 text-center"> {message} </div>
                    <button type="button" className="btn btn-dark mt-3 expand" onClick={() => add()}> ADD </button>
                </div>
            </form>
        </div>
        <Footer />
    </div>
    );
}

export default Create;