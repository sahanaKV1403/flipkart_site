import React from 'react'
import './Sidebar.css'
import grocery from '../../assets/grocery.png'
import mobile from '../../assets/mobile.png'
import fashion from '../../assets/fashion.png'
import electronics from '../../assets/electronics.png'
import furniture from '../../assets/furniture.png'
import appliances from '../../assets/mobile.png'
import travel from '../../assets/travel.png'
import toys from '../../assets/toys.png'
import { useCategoryContext } from '../../context/category.context'

const Sidebar = () => {
    const { setCategory } = useCategoryContext();
    return (
        <div className='sidebar'>
            <div className='bg'>
                <div className="grocery" onClick={() => setCategory("electronics")}>
                    <img src={grocery} alt="" />
                    <p>Grocery</p>
                    {/* <span><img src={dropdown_icon} alt="" /></span> */}
                </div>
                <div className="mobiles" id="mobile-dropdown" onClick={() => setCategory("jewelery")}>
                    <img src={mobile} alt="" />
                    <p>Mobiles</p>
                    <div className="mobile-dropdown-menu">
                    <a to="#"><b>Samsung Galaxy</b></a>
                    <a to="#"><b>One Plus</b></a>
                    <a to="#" id="iphone"><b>iPhone</b>
                        <div className="iPhone-dropdown-menu">
                            <a to="#"><b>12</b></a>
                            <a to="#"><b>13</b></a>
                            <a to="#"><b>14</b></a>
                        </div>
                    </a>
                    <a to="#"><b>Redmi Note</b></a>
                </div>
                </div>
               
                <div className="fashion" onClick={() => setCategory("men's clothing")}>
                    <img src={fashion} alt="" />
                    <p>Fashion</p>
                    
                </div>
                <div className="electronics" onClick={() => setCategory("women's clothing")}>
                    <img src={electronics} alt="" />
                    <p>Electronics</p>
                </div>
                <div className="home_and_furniture" onClick={() => setCategory("electronics")}>
                    <img src={furniture} alt="" />
                    <p>Home & furniture</p>
                </div>
                <div className="appliances" onClick={() => setCategory("jewelery")}>
                    <img src={appliances} alt="" />
                    <p>Appliances</p>
                </div>
                <div className="travel" onClick={() => setCategory("men's clothing")}>
                    <img src={travel} alt="" />
                    <p>Travel</p>
                </div>
                <div className="beauty_Toys_and_more" onClick={() => setCategory("women's clothing")}>
                    <img src={toys} alt="" />
                    <p>Beauty, Toys & More</p>
                </div>
            </div>

        </div>
    )
}

export default Sidebar