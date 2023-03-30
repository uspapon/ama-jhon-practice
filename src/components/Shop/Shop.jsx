import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(resp => resp.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        // console.log("products",products);
        const storedCart = getShoppingCart();
        const savedCart = [];

        // step 1: get id
        for(const id in storedCart){
            // console.log(id);

        // step 2: get the product using id
            const savedLocalProductFindingInProductCatalog = products.find(product => product.id === id )
        // step 3: get the product qty of product
           if(savedLocalProductFindingInProductCatalog){
               
               const quantity = storedCart[id];
               savedLocalProductFindingInProductCatalog.quantity = quantity; //here we are updating product quantity into the product catalogue 
        // step 4: add the added product to the saved cart found in local storage
               savedCart.push(savedLocalProductFindingInProductCatalog);
           }
        }

        // step 5: set the cart
        setCart(savedCart);

    },[products])  // look back ref module 51, vedio 5 timestamp:08 min 18sec

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}

                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;