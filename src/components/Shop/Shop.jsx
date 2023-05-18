import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { setItem } from 'localforage';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { totalProducts } = useLoaderData();
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    // finding page numbers
    /***
    const pageNumbers = [];
    for(i=1, i>totalPages; i++){
        pageNumbers.push(i);
    }
    ----And alternatively we can do the same thing with one line of code like the folloing 
        const pageNumbers = [...Array(totalPages).keys()];
     * **/
    const pageNumbers = [...Array(totalPages).keys()];
    console.log(totalProducts);
    /***
     * Done: determing total number of products 
     * TODO: decide the number of items per page
     * 3: Done: determine the total number of pages
     * 4: Done: determine the current page
     * 
     * **/

    const handleClearCart = () => {
        deleteShoppingCart();
        setCart([]);
    }
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(resp => resp.json())
    //         .then(data => setProducts(data))
    // }, [])


    useEffect(() => {
        fetchData();
    }, [currentPage, itemsPerPage]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const apiData = await response.json();
            setProducts(apiData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
        useEffect(() => { // this function retrive cart data from the local storage also handles any new data that user have decided to add into the cart. 
            // console.log("products",products);
            const storedCart = getShoppingCart(); // getting cart info from local storage
            const savedCart = []; // initialization of a new cart which will include stored product in localStorage as well as if user add any more product any time

            // step 1: get id
            for (const id in storedCart) { // getting  the id of the product saved in local storage
                // console.log(id);

                // step 2: get the product using id
                const savedLocalProductFindingInProductCatalog = products.find(product => product._id === id) // finding product details by id(stored in local storage) from the API fetched array of object
                // step 3: get the product qty of product
                if (savedLocalProductFindingInProductCatalog) { // here the var will find the product as an object from the above products.find operation 

                    const quantity = storedCart[id]; // here the product object's quantity field will be updated since user may have selected more than one qty to buy so updating the qty field in the product object transform the product data into a user added product into the cart. 
                    savedLocalProductFindingInProductCatalog.quantity = quantity; //here we are updating product quantity into the product catalogue 
                    // step 4: add the added product to the saved cart found in local storage
                    savedCart.push(savedLocalProductFindingInProductCatalog); // when user added product is generated into the above line, now its time to make an array of object where each product object will be the element of an array. why do we needed to push the product objects into an array? because in every clieck the cart state changes, and en every change we need to pass usestate() a parametere, by default its parameter is set as an array so in every click of adding product we need to call the setCart() of useState and pass an array of product object so things get a real time update.
                }
            }

            // step 5: set the cart
            setCart(savedCart); // in every click to add a new product setCart will be called and update its default value(which is an empty array in useState() function) with the newly added product. 

        }, [products])  // look back ref module 51, vedio 5 timestamp:08 min 18sec: here we pushed products in the dependency array [products] so that everytime data fetching is delayed useEffect() may delay otherwise inside of this function will fall into error due to not finding products to do further operation. 

        const handleAddToCart = (product) => {
            let newCart = [];
            const exists = cart.find(pd => pd._id === product._id);

            if (!exists) {  // in case of adding new product into the cart
                product.quantity = 1;
                newCart = [...cart, product];
            } else { // in case of adding product that already exists into the cart
                exists.quantity = exists.quantity + 1;
                const remaining = cart.filter(pd => pd._id !== product._id);
                newCart = [...remaining, exists];
            }
            setCart(newCart);
            addToDb(product._id);
        }


        // handling change of the select input
        const options = [5, 10, 20]
        const handleSelectChange = (event) => {
            setItemsPerPage(parseInt(event.target.value));
            setCurrentPage(0);
        }
        return (
            <>
                <div className='shop-container'>
                    <div className="products-container">
                        {
                            products.map(product => <Product
                                key={product._id}
                                product={product}
                                handleAddToCart={handleAddToCart}

                            ></Product>)
                        }
                    </div>
                    <div className="cart-container">
                        <Cart
                            cart={cart}
                            handleClearCart={handleClearCart}
                        >

                            <Link to="/orders">
                                <button className='btn-proceed'>
                                    Review Order
                                    <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>
                                </button>

                            </Link>

                        </Cart>
                    </div>
                </div>

                {/* pagination */}
                <div className='pagination'>
                    <p>Current Page: {currentPage}
                        and items per page: {itemsPerPage}
                    </p>
                    {
                        pageNumbers.map(number =>
                            <button
                                key={number}
                                className={currentPage === number ? 'selected' : ''}
                                onClick={() => setCurrentPage(number)}

                            >{number}</button>)
                    }

                    <select value={itemsPerPage} onChange={handleSelectChange}>
                        {
                            options.map(option =>
                                <option key={option} value={option}>
                                    {option}
                                </option>

                            )
                        }
                    </select>

                </div>

            </>
        );
    };

    export default Shop;