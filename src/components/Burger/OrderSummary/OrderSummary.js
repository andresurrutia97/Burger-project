import React, { Component } from "react";
import Aux from "../../../hoc/Auxi/Auxi";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burguer with the following ingrediets:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.cancel} btnType={"Danger"}>
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType={"Success"}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
