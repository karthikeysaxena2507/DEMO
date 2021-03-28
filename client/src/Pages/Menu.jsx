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

const Menu = () => {

    const { id } =  useParams();
    const [dishes, setDishes] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [starters, setStarters] = useState([]);
    const [breads, setBreads] = useState([]);
    const [resturant, setResturant] = useState({});
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [netAmount, setNetAmount] = useState(0);

    useEffect(() => {       
        const fetch = async() => {
            try {
                const response = await axios.get(`/dishes/get/${id}`);
                setDishes(response.data.filter((dish) => (dish.category === "Main Course")));
                setStarters(response.data.filter((dish) => (dish.category === "Starters")));
                setBeverages(response.data.filter((dish) => (dish.category === "Beverages")));
                setBreads(response.data.filter((dish) => (dish.category === "Bread")));
                setDesserts(response.data.filter((dish) => (dish.category === "Desserts")));
                const result = await axios.get(`/resturants/get/${id}`);
                setResturant(result.data);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetch();
    },[id]);

    const printDishes = (props) => {

        const addToBill = async() => {
            const item = {
                id: props.id,
                name: props.name,
                quantity: 1,
                price: props.price,
                amount: props.price
            }
            setNetAmount((prev) => (prev + props.price));
            let index = items.findIndex((item) => (Number(props.id) === Number(item.id)));
            const undefinedIndex = items.findIndex((item) => (item.name === undefined));
            (undefinedIndex > 0) && items.splice(undefinedIndex, 1);
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
            hide = {true}
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
    <Navbar username={null} id = {id}/>
    <div className="upper-margin container">
        <Header />
        <h3 className="mt-3"> My Resturant </h3>
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
        <hr />
        <div>
        <h3 className="mt-3"> Menu </h3>
        <div>
            <div className="mt-2 text-center"><b>BEVERAGES: </b> <div> {beverages.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>STARTERS: </b><div> {starters.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>MAIN COURSE: </b><div> {dishes.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>BREAD: </b><div> {breads.map(printDishes)} </div></div>
            <div className="mt-2 text-center"><b>DESSERTS: </b><div> {desserts.map(printDishes)} </div></div>
        </div>
        </div>
        <hr />
        <h4 className="mt-3"> Make a Bill </h4>
        <div>
            {items.map(printBillItems)}
        </div>
        <div className="mt-3 amt text-center">
             TOTAL AMOUNT (including 12% GST) = Rs {(netAmount + (0.12 * netAmount)).toFixed(2)} Rs {netAmount.toFixed(2)}
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

export default Menu;