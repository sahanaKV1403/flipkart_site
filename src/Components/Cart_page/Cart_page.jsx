import React, { useState } from 'react'
import './Cart_page.css';
import { useCartContext } from '../../context/cart.context';
import { useAddressContext } from '../../context/address.context';
import authenticate from '../../assets/authenticate.jpg'
import { Modal, Button } from "react-bootstrap";
import Myorders from '../../Components/Myorders/Myorders';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const Cart_page = () => {
    const { cart, setCart } = useCartContext();
    const { setAddress } = useAddressContext();
    const [showModal, setShowModal] = useState(false);
    const [addressInputs, setAddressInputs] = useState({
        name: "",
        contact: "",
        address: "",
        pincode: ""
    });

    const handleInputChange = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveAddress = () => {
        if (Object.values(addressInputs).some(value => value === "")) {
            alert("Please enter values for all the fields!");
        } else {
            setAddress([addressInputs]);
            setShowModal(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInputs({ ...addressInputs, [name]: value });
    };

    const handleIncreaseQuantity = (index) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: (item.quantity) ? item.quantity + 1 : 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    };


    const handleDecreaseQuantity = (index) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index && item.quantity > 0) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    };
    console.log(cart);

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0).toFixed(2);

    const totaldelivery = cart.reduce((total, item) => {
        return total + (item.price * item.quantity) * 8 / 100;
    }, 0).toFixed(2);

    const totaldiscount = cart.reduce((total, item) => {
        return total + (item.price * item.quantity) * 27 / 100;
    }, 0).toFixed(2);

    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((item, i) => i !== index);
        setCart(updatedCart);
    };


    return (
        <div className='cartpage'>
            <div className=' lefthalf'>
                <div className='mainfeed address'>
                    <p><b>From Saved Addresses</b></p>
                    <button className="btn btn-outline-primary fw-bold p-3" onClick={handleInputChange}>
                        Enter Delivery Pincode
                    </button>
                </div>

                <div className='mainfeed summary'>
                    <div className='cartitems'>
                        {cart?.map((item, index) => {
                            let a = (item.price * item.quantity).toFixed(2);
                            if (!item.quantity) {
                                item.quantity = 1;
                            }
                            return (

                                <div className="card1" key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <img src={item.image} alt="" />
                                    <div className='card1_description'>
                                        <p >{item.title}</p>
                                        <p><i><b>$ {a}/-</b></i></p>
                                        <p >{item.rating.rate}* | {item.rating.count} reviews</p>
                                        <p className="delivery">Delivery by <b>{Math.floor(Math.random() * 30) + 1}/{Math.floor(Math.random() * 7) + 5}/2024</b> | <strike>${(a * 8 / 100).toFixed(2)}/-</strike> <span className='free'>Free</span> </p>
                                        <button className="btn btn-dark ps-3 pe-3" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                        <span className="m-2 ps-4 pe-4 btn btn-outline-dark">{item.quantity}</span>
                                        <button className="btn btn-dark ps-3 pe-3" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                        <span onClick={() => handleRemoveItem(index)} className='removeitem btn btn-danger' >Remove</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='placeorder'>
                        {cart.length > 0 && <div>
                            <Link to="/Myorders"> <button>PLACE ORDER</button></Link>
                        </div>}
                        {
                            cart.length == 0 &&
                            <div>
                                <Link to="/"><button className='w-100 p-1 m-0'><b>NO ITEMS IN THE CART</b>
                                <p> ( Click here to add items to the cart. )</p>
                                </button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>

                <div className="pricedetails mainfeed">
                    <p className='fs-4 priceheader'>PRICE DETAILS</p>
                    <div className='pricebody'>
                        <div>
                            <p>Price ({cart.length} item)</p>
                            <p>${totalPrice}/-</p>
                        </div>
                        <div>
                            <p>Discount (27% off)</p>
                            <p>-${totaldiscount}/-</p>
                        </div>
                        <div>
                            <p>Delivery Charges</p>
                            <p><strike>${totaldelivery}</strike><span className='free'> Free</span></p>
                        </div>
                        <div className='fw-bold fs-3 total'>
                            <p>Total Amount </p>
                            <p>${(totalPrice - ((totalPrice * 27) / 100)).toFixed(2)}/-</p>
                        </div>
                    </div>
                    <p className='free fs-4 ps-3'> You will save ${(Number(totaldiscount) + Number(totaldelivery)).toFixed(2)} on this order</p>
                </div>
                <div className='safe ps-5 pe-5'>
                    <img className="authenticate me-3" src={authenticate} />
                    <p>Safe and secure Payments. Easy returns. 100% Authentic products.</p>
                </div>

            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><input type="text" name="name" placeholder="Name (required)" onChange={handleChange} className="w-100 p-2" /></p>
                    <p><input type="text" name="contact" placeholder="Contact Number (required)" onChange={handleChange} className='w-100 p-2' /></p>
                    <p><input type="textarea" name="address" placeholder="Address (required)" onChange={handleChange} className='w-100 p-2' /></p>
                    <p><input type="text" name="pincode" placeholder="PinCode (required)" onChange={handleChange} className='w-100 p-2' /></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveAddress}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Cart_page;