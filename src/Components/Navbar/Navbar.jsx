import React, { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import seller_icon from '../../assets/seller_icon.png'
import menu_icon from '../../assets/menu_icon.png'
import search from '../../assets/search.png'
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode as jwt_decode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { useCartContext } from '../../context/cart.context';
import { useCategoryContext } from '../../context/category.context';
import Cart_page from '../../Components/Cart_page/Cart_page';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const { setCategory } = useCategoryContext();
    const { cart, setCart } = useCartContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            localStorage.setItem('userData', JSON.stringify(tokenResponse));
            setIsLoggedIn(true);
            console.log(tokenResponse);
        }
    })
    const handleSignOut = () => {
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setCart([]);
        setCategory("");
        
    }
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <nav className='flex-div'>

            <div className='nav-left flex-div'>
                <a href="/"> <img className='logo' src={logo} alt='logo' onClick={(e) => {
                    e.preventDefault(); setCategory("");
                }} /></a>
            </div>
            <div className='nav-middle flex-div'>
                <div className="search-box flex-div">
                    <img src={search} alt='search_icon' />
                    <input type="text" placeholder='Search for Products, Brands and More' />
                </div>
            </div>
            <div className='nav-right flex-div'>
                <div className="user-icon">
                    <button id="signin" className={`btn ${isLoggedIn ? "btn-danger" : "btn-success"}`} onClick={() => isLoggedIn ? handleSignOut() : login()}>
                        {isLoggedIn ? "Sign Out" : "Sign In"}
                    </button>
                </div>
                <div className="cart-icon" >
                    {cart.length>0&&<Link to="/Cart_page" className="placeorder">
                    <img src={cart_icon} alt="cart_icon" width="35px" />
                    <span id="count">{cart.length}</span>
                    </Link>}
                </div>
                <div className="seller-icon">
                    <img src={seller_icon} alt="seller_icon" width="35px" />
                </div>

                <div className="menu-icon" id="menu-dropdown">
                    <img src={menu_icon} alt="menu_icon" width="35px" />
                    <div id="dropdown-menu">
                        <a to="#"><b>Notification Preferences</b></a>
                        <a to="#"><b>24x7 Customer Care</b></a>
                        <a to="#"><b>Advertise</b></a>
                        <a to="#"><b>Download App</b></a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;