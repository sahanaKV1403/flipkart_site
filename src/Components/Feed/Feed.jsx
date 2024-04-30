import React, { useEffect, useState } from 'react'
import './Feed.css'
import { useCategoryContext } from '../../context/category.context';
import { useCartContext } from '../../context/cart.context';

const Feed = () => {
  const { category } = useCategoryContext();
  const { cart, setCart } = useCartContext();
  const [data, setData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const fetchData = () => {
    const videoList_url = category === "" ? `https://fakestoreapi.com/products` : `https://fakestoreapi.com/products/category/${category}/`;
    fetch(videoList_url)
      .then(response => response.json())
      .then(data => setData(data));
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const countItems = cart.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1; //if acc[item.id] is undefined then value is 0, else that value + 1
      return acc;
    }, {});
    console.clear();
    console.log("CART ITEMS = ", cart)
    console.log("QUANTITY PER ID = ", countItems);

  }, [cart]);


  const handleClick = (index) => {
    setSelectedItemIndex(index);
  }
  
  const addToCart = (item) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const itemExists = cart.find(cartItem => cartItem.id === item.id); 
    if (itemExists) {
      alert('This item is already added to cart, to add more quantities of this product visit cart page.');
    } else {
      if (userData) {
        setCart([...cart, item]);
        setIsLoggedIn(true);
      } else {
        alert('Please log in with Google account to add items to the cart');
      }
    }
  }
  return (
    <div className='mainfeed'>
      {category && <h3>Best of {category?.charAt(0).toUpperCase() + category?.slice(1)}</h3>}

      <div className="feed">
        {data?.map((item, index) => {
          return (
            <div className='card' key={item.id}>
              <img src={item.image} alt="" />
              <div className='description'>
                <p className='title'>{item.title}</p>
                <p className='price'>$ {item.price}/-</p>
                <button id="viewdetails" onClick={() => handleClick(index)} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#myModal${index}`}>
                  VIEW MORE DETAILS
                </button>
                <button id="addcart" onClick={() => addToCart(item)} type="button" className="btn ms-5 mt-2">
                  ADD TO CART
                </button>
              </div>
              <div className={`modal ${selectedItemIndex === index && 'show'}`} id={`myModal${index}`}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">{item.title}</h4>
                    </div>
                    <div className="modal-body">
                      <img src={item.image} alt="" />
                      <p className='price'><b>PRICE: </b>$ {item.price}/-</p>
                      <p className='moredescription'><b>DESCRIPTION: </b>{item.description}</p>
                      <p className='rate'><b>RATE: </b> {item.rating.rate}*</p>
                      <p className='count'><b>COUNT: </b>{item.rating.count}</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setSelectedItemIndex(null)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
   
  )
}
export default Feed;


