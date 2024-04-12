import React from 'react'
import logo from './../../images/amazon-logo.png';
import ssl from './../../images/lock.png'
const CheckoutNav = () => {
  return (
    <nav className='banner-border checkout-nav'>
        <img src={logo} alt=""  style={{height:'50px',width:"150px",color:'#0000'}}/>
        <h2>
            Checkout
        </h2>
        <img src={ssl} alt="" className='ssl'/>
    </nav>
  )
}
export default CheckoutNav