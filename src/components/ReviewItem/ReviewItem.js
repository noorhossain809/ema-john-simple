import React from 'react';

const ReviewItem = (props) => {
    const {img, name, quantity, price} = props.product
    return (
        <div className="product">
            <img src={img} alt=""/>
            <div className="products">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <h5>Price: $ {price}</h5>
            <button className="main-button">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;