import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props)
    const { img, name, seller, price, stock, key } = props.product;
    return (

        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="products">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <h5>Price: ${price}</h5>
                <p>Only {stock} left in stack - Order soon</p>
                {props.shawAddToCart === true && <button 
                 className="main-button" onClick={() => props.handleAddProduct(props.product)}>
                     <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;