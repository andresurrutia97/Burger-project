import React from "react";
import Burguer from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it´s tastes well!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burguer ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
