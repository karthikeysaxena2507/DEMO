import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Resturant from "../Components/Resturant";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const Resturants = () => {

    const [resturants, setResturants] = useState([]);
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await axios.get("/resturants/get/all");
                const result = await axios.get("/resturants/check");
                if(result.data === "DNE") setId(null);
                else setId(result.data);
                setResturants(response.data);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetch();
    },[]);

    const printResturants = (props) => {
        return <Resturant
            key = {props.id}
            id = {props.id}
            name = {props.name}
            owner = {props.owner}
            city = {props.city}
            state = {props.state}
            address = {props.address}
            about = {props.about}
            resturant_type = {props.resturant_type}
            cuisine = {props.cuisine}
            closesAt = {props.closesAt}
            opensAt = {props.opensAt}
            imageUrl = {props.imageUrl}
        />
    }

    return (loading) ? <Loader /> :
    <div> 
        <Navbar username = {null} id = {id} />
        <div className="upper-margin container">
            <Header />
            <h3 className="text-center mb-3 mt-3"> All Resturants</h3>
            {resturants.map(printResturants)}
            <Footer />
        </div>
    </div>
}

export default Resturants;