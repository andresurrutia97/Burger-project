import React from "react";
import classes from "./Order.css";

const Order = props => {
  let ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push({ name: i, amount: props.ingredients[i] });
  }

  const ingre = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 4px",
          padding: "2px 4px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
        key={ig.name}
      >
        {" " + ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingre} </p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
