import { getShoppingCart } from "../../utilities/fakedb";

const cartProductsLoader = async() => {
    const storedCart = getShoppingCart(); // stored cart doesn't have all the product details, it has only the id and qty
    console.log("storedCart=",storedCart);
    const ids = Object.keys(storedCart);
    console.log("ids from loader", ids);
    const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)

    });
    const products = await loadedProducts.json();
    console.log("products by ids", products);

    // if the cart is in the database you have to async await
    // const storedCart = getShoppingCart(); // stored cart doesn't have all the product details, it has only the id and qty
    const savedCart = []; // saved cart is something we will generate marging the savedCart With the database product(fetched through json)

    for(const id in storedCart){
        const mirrorProductOfLocalStorageProduct = products.find(pd => pd._id === id); // got the complete product detail by id stored in local storage 
        
        if(mirrorProductOfLocalStorageProduct){

            const quantity = storedCart[id];
            mirrorProductOfLocalStorageProduct.quantity = quantity;  // jsut updating the quantity field of the mirrorProduct according local storage quantity. 
            savedCart.push(mirrorProductOfLocalStorageProduct);
        }

    }

    return savedCart;
}

export default cartProductsLoader;