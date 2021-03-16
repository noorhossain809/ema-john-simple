import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = (props) => {
    const {img, name, quantity, price, key} = props.product
    return (
        <div className="product">
            <img src={img} alt=""/>
            <div className="products">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <h5>Price: $ {price}</h5>
            <button className="main-button" onClick={() => props.removeProduct(key)}>
            <FontAwesomeIcon icon={faBackspace} /> Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;