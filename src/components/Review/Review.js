import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderedPlace, setOrderedPlace] = useState(false)

    const handleOrderPlace = () => {
        setCart([])
        setOrderedPlace(true)
        processOrder();
    }
    

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts)
    }, [])
    let thankYou;
    if(orderedPlace){
        thankYou = <img src={happyImage} alt=""/>
            
    }
    
    const removeProduct = (productKey) => {
        // console.log('clicked data', productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)

    }
    

    return (
        <div className="twin-container">
        <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
                    
            }
            {thankYou}
            </div>
            <div className="cart-container">
                    <Cart cart={cart}></Cart>
                    <button onClick={handleOrderPlace} className="main-button">Place Order</button>
            </div>
        </div>
    );
};

export default Review;