import React from "react";
import "./Card.css";

const Card = (props) => {
  const handleAddToCart = () => {
    if (props.addProduct) {
      props.addProduct({
        id: props.id,
        title: props.title,
        price: props.price,
        img: props.img,
      });
    }
  };

  return (
    <div className="cardContainer">
      <div className="cardActionArea">
        <img className="cardMedia" src={props.img} />
        <div className="cardContent">
          <h5 className="cardTitle">{props.title}</h5>
          <p className="cardDescription">${props.price}</p>
        </div>
      </div>
      <div className="cardActions">
        <button className="buttonPrimary" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
