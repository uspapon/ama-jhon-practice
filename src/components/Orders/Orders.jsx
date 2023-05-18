import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';
import { deleteShoppingCart, removeFromDb } from '../../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        console.log("remove cart item id", id);
        const remaining = cart.filter(product => product._id != id);
        console.log("not removing check",remaining);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        deleteShoppingCart();
        setCart([]);
    }

    console.log("loader product", savedCart);
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to="/checkout">
                        <button className='btn-proceed'>
                            Proceed Checkout
                            <FontAwesomeIcon icon={faMoneyCheckDollar}></FontAwesomeIcon>
                        
                        </button>
                        
                    </Link>
                </Cart>
            </div>
    

        </div>
    );
};

export default Orders;