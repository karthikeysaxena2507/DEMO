/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Dish from "../Components/Dish";
import Resturant from "../Components/Resturant";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Item from "../Components/Item";
import { CSVLink } from "react-csv";

const MyResturant = () => {

    const { id } =  useParams();
    const [dishes, setDishes] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [starters, setStarters] = useState([]);
    const [breads, setBreads] = useState([]);
    const [resturant, setResturant] = useState({});
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("Select Catgeory");
    const [type, setType] = useState("Select Type");
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [netAmount, setNetAmount] = useState(0);

    useEffect(() => {
        const check = async() => {
            try {
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

                const fetch = async() => {
                    try {
                        const res = await axios.get("/resturants/check");
                        if(res.data === "DNE") window.location = "/";
                        else {
                            if(res.data !== Number(id)) window.location = "/";
                        }
                        const response = await axios.get(`/dishes/get/${id}`);
                        setDishes(response.data.filter((dish) => (dish.category === "Main Course")));
                        setStarters(response.data.filter((dish) => (dish.category === "Starters")));
                        setBeverages(response.data.filter((dish) => (dish.category === "Beverages")));
                        setBreads(response.data.filter((dish) => (dish.category === "Bread")));
                        setDesserts(response.data.filter((dish) => (dish.category === "Desserts")));
                        const result = await axios.get(`/resturants/get/${id}`);
                        setResturant(result.data);
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
                fetch();

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
    },[id]);

    const addDish = async() => {
        try {
            setMessage("Adding Dish To Menu ....");
            const data = {
                username,
                name,
                price,
                category,
                type,
                resturantId: resturant.id
            }
            await axios.post("/dishes/add", data);
            const response = await axios.get(`/dishes/get/${id}`);
            setDishes(response.data.filter((dish) => (dish.category === "Main Course")));
            setStarters(response.data.filter((dish) => (dish.category === "Starters")));
            setBeverages(response.data.filter((dish) => (dish.category === "Beverages")));
            setBreads(response.data.filter((dish) => (dish.category === "Bread")));
            setDesserts(response.data.filter((dish) => (dish.category === "Desserts")));
            setPrice(0);
            setName("");
            setCategory("Select Category");
            setType("Select Type");
            setMessage("");
        }
        catch(err) {
            console.log(err);
        }
    }

    const printDishes = (props) => {

        const remove = async() => {
            try {
                await axios.post(`/dishes/remove/${props.id}`, {username});
                const response = await axios.get(`/dishes/get/${id}`);
                setDishes(response.data.filter((dish) => (dish.category === "Main Course")));
                setStarters(response.data.filter((dish) => (dish.category === "Starters")));
                setBeverages(response.data.filter((dish) => (dish.category === "Beverages")));
                setBreads(response.data.filter((dish) => (dish.category === "Bread")));
                setDesserts(response.data.filter((dish) => (dish.category === "Desserts")));
            }
            catch(err) {
                console.log(err);
            }
        }

        const addToBill = async() => {
            const item = {
                id: props.id,
                name: props.name,
                quantity: 1,
                price: props.price,
                amount: props.price
            }
            setNetAmount((prev) => (prev + props.price));
            const undefinedIndex = items.findIndex((item) => (item.name === undefined));
            (undefinedIndex > 0) && items.splice(undefinedIndex, 1);
            let index = items.findIndex((item) => (Number(props.id) === Number(item.id)));
            if(index === (-1)) {
                setItems((prevItems) => [...prevItems, item])
            }
            else {
                const newItems = [...items];
                item.quantity = items[index].quantity + 1;
                item.amount = items[index].amount + props.price;
                newItems[index] = item;
                setItems(newItems);
            }
        }

        return <Dish
            key = {props.id}
            id = {props.id}
            name = {props.name}
            category = {props.category}
            price = {props.price}
            type = {props.type}
            remove = {() => remove()}
            add = {() => addToBill()}
        />
    }

    const printBillItems = (props) => {

        const removeFromBill = async() => {
            setNetAmount((prev) => (prev - props.price));
            const undefinedIndex = items.findIndex((item) => (item.name === undefined));
            (undefinedIndex > 0) && items.splice(undefinedIndex, 1);
            let index = items.findIndex((item) => (Number(props.id) === Number(item.id)));
            const item = {
                id: props.id,
                name: props.name,
                quantity: 1,
                price: props.price,
                amount: props.price
            }
            const newItems = [...items];
            if(newItems[index].quantity === 1) {
                newItems.splice(index, 1);
                setItems(newItems);
            }
            else {
                item.quantity = newItems[index].quantity - 1;
                item.amount = newItems[index].amount - props.price;
                newItems[index] = item;
                setItems(newItems);
            }
        }

        return <Item 
            key = {props.id}
            id = {props.id}
            name = {props.name}
            quantity = {props.quantity}
            price = {props.price}
            amount = {props.amount}
            change = {() => removeFromBill()}
        />
    }

    return (loading) ? <Loader /> :
    <div>
    <Navbar username={username} id = {id}/>
    <div className="upper-margin container">
        <Header username = {username} />
        <h3 className="text-center mt-3"> My Resturant </h3>
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
                imageUrl = {resturant.imageUrl}
                hide = {true}
            />
        </div>
        <div className="text-center">
            <button type="button" className="btn btn-dark expand mt-3" onClick={() => window.location = `/edit/${id}`}> EDIT </button>
        </div>
        <hr />
        <div>
        <h3 className="text-center mt-3"> Menu </h3>
        <div>
            <div className="mt-2 text-center"><b>BEVERAGES: </b> <div> {beverages.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>STARTERS: </b><div> {starters.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>MAIN COURSE: </b><div> {dishes.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>BREAD: </b><div> {breads.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>DESSERTS: </b><div> {desserts.map(printDishes)} </div></div>
        </div>
        </div>
        <hr />
        <h3 className="text-center mt-3"> Add a new dish </h3>
        <div className="row text-center">
            <div className="mt-2 col-md-3 text-center">
                <b> Name of Dish </b>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dish's Name" 
                    autoComplete="off" 
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <div className="mt-2 col-md-3 text-center">
                <b> Price of Dish </b>
                <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Dish's Price" 
                    autoComplete="off" 
                    className="pt-2 pb-2 pr-2 pl-2"
                    required 
                />
            </div>
            <div className="col-md-3 dropdown mt-2 text-center">
                <b> Select Catgeory </b>
                <br />
                <button style={{border: "2px solid black", width: "100%", textAlign: "left", backgroundColor: "white"}} className="btn dropdown-toggle mt-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {category}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setCategory(e.target.innerText)}}> Beverages </a>
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setCategory(e.target.innerText)}}> Starters </a>
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setCategory(e.target.innerText)}}> Main Course </a>
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setCategory(e.target.innerText)}}> Bread </a>
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setCategory(e.target.innerText)}}> Desserts  </a>
                </div>
            </div>
            <div className="col-md-3 dropdown mt-2 text-center">
                <b> Select Type </b>
                <br />
                <button style={{border: "2px solid black", width: "100%", textAlign: "left", backgroundColor: "white"}} className="btn dropdown-toggle mt-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {type}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setType(e.target.innerText)}}> Vegetarian </a>
                    <a className="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); setType(e.target.innerText)}}> Non Vegetarian </a>
                </div>
            </div>
        </div>
        <div className="text-center mb-3">
            <div className="mt-2">{message}</div>
            <button type="button" className="btn btn-dark mt-3 expand" onClick={() =>addDish()}> ADD </button>
        </div>
        <hr />
        <h4 className="text-center"> Make a Bill </h4>
        <div>
            {items.map(printBillItems)}
        </div>
        <div className="mt-3 amt text-center">
             TOTAL AMOUNT (including 12% GST) = Rs {(netAmount + (0.12 * netAmount)).toFixed(2)} 
        </div>
        <div className="text-center mt-3">
            <div className="btn btn-dark expand"> 
                <CSVLink 
                    filename={resturant.name + "'s Bill.csv"} 
                    data={items} 
                    onClick={() => {
                        const undefinedIndex = items.findIndex((item) => (item.name === undefined));
                        (undefinedIndex > 0) && items.splice(undefinedIndex, 1);
                        setItems((prev) => [...prev, {amount: (netAmount + (0.12 * netAmount)).toFixed(2) + " (After Including 12% GST) "}]);
                    }}
                    className="bill expand" 
                > Download Bill 
                </CSVLink>
            </div>
        </div>
    </div>
    <Footer />
</div>
}

export default MyResturant;