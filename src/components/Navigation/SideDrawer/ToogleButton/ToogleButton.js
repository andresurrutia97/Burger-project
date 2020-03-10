import React from "react";
import classes from "./ToogleButton.css";

const toogleButton = props => (
  <div onClick={props.clicked} className={classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div> 
  </div>
);

export default toogleButton;
