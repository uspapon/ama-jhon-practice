import React from 'react';
import './Product.css';

const Product = (props) => {
    // console.log(props.product);
    const { img, name, seller, ratings, price } = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <p>Price: ${price}</p>
                <p>Manufacturar: {seller}</p>
                <p>Rating: {ratings}</p>
            </div>
            <button onClick={} className='btn-cart'>Add to Cart</button>
        </div>
    );
};

export default Product;