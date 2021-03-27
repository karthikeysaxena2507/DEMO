import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Dish from "../Components/Dish";
import Resturant from "../Components/Resturant";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const Menu = () => {

    const { id } =  useParams();
    const [dishes, setDishes] = useState([]);
    const [resId, setResId] = useState(0);
    const [resturant, setResturant] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await axios.get(`/dishes/get/${id}`);
                setDishes(response.data);
                const result = await axios.get(`/resturants/get/${id}`);
                setResturant(result.data);
                const rest = await axios.get("/resturants/check");
                if(rest.data === "DNE") setResId(null);
                else setResId(result.data);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetch();
    },[id]);

    const printDishes = (props) => {
        return <Dish
            key = {props.id}
            id = {props.id}
            name = {props.name}
            category = {props.category}
            price = {props.price}
            type = {props.type}
        />
    }

    return (loading) ? <Loader /> :
    <div>
    <Navbar username = {null} id = {resId}/>
    <div className="upper-margin container">
        <Header />
        <h3> Dishes </h3>
        <div>
            {dishes.map(printDishes)}
        </div>
        <div>
            <Resturant
                key = {resturant.id}
                id = {resturant.id}
                name = {resturant.name}
                owner = {resturant.owner}
                city = {resturant.city}
                state = {resturant.state}
                address = {resturant.address}
                about = {resturant.about}
                resturant_type = {resturant.resturant_type}
                cuisine = {resturant.cuisine}
                closesAt = {resturant.closesAt}
                opensAt = {resturant.opensAt}
            />
        </div>
    </div>
    <Footer />
</div>
}

export default Menu;