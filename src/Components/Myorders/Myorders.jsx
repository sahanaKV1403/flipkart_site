import React from 'react'
import './Myorders.css'
import hurray from '../../assets/Hurray.png';
import smile from '../../assets/smile.jpg';
import { useAddressContext } from '../../context/address.context';
import { useCartContext } from '../../context/cart.context';

const Myorders = () => {
  const { address } = useAddressContext();
  const { cart } = useCartContext();
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0).toFixed(2);
  return (

    <div className='myorders'>
      <div className='orderplaced'>
        <img src={hurray} alt="" width="250px" height="250px" />
        <p>Hurray!!! Your Order is on your way.</p>
        <img src={smile} alt="" width="200px" height="150px" />
      </div>
      <div className='invoice'>
        <p className='invoicehead'><u>ORDERS</u></p>
        <div className='details'>
          {address[0] && (<div className='useraddress'>
            <span className='ps-2 fs-5 fw-bold'>Customer Details</span>
            <div>
              <p>Name:</p>
              <p>{address[0].name}</p>
            </div>
            <div>
              <p>Contact:</p>
              <p>{address[0].contact}</p>
            </div>
            <div>
              <p>Address:</p>
              <p>{address[0].address}</p>
            </div>
            <div>
              <p>PinCode:</p>
              <p>{address[0].pincode}</p>
            </div>
          </div>
          )}
        </div>
        <div className='orderdetails useraddress '>
          <span className='ps-2 fs-5 fw-bold'>Order Details</span>
          <div>
            <p>Invoice Number :</p>
            <p>788152</p>
          </div>
          <div>
            <p>Invoice Date :</p>
            <p>12 May, 2024</p>
          </div>
          <div>
            <p>AWB number : </p>
            <p>5335T5S</p>
          </div>
        </div>
        <div className="feed1 ">
          {cart?.map((item, index) => {
            return (
              <div className='card1' key={item.id}>
                <img src={item.image} alt=""/>
                <div className='w-100 ms-2'>
                  <p><b>{item.title}</b></p>
                  <p><i><b>${item.price}/-</b></i></p>
                  <p><b>{item.quantity} Qty</b></p>
                  <p>{item.rating.rate}* <span className='ratecount'>{item.rating.count} views</span></p>
                  <div class="progress">
                    <div class="progress-bar bg-warning w-100" role="progressbar" style={{ width: '30%' }}> Shipped</div>
                    <div class="progress-bar bg-primary w-100" role="progressbar" style={{ width: '45%' }} > Out for Delivery</div>
                    <div class="progress-bar bg-success w-100" role="progressbar" style={{ width: '5%' }} >Delivered</div>
                  </div>

                </div>

              </div>

            )
          }
          )
          }
        </div>
        <div className='total1'>
          <p>Total Paid : ${(totalPrice - ((totalPrice * 27) / 100)).toFixed(2)}/-</p>
        </div>
      </div>
    </div>
  )
}

export default Myorders