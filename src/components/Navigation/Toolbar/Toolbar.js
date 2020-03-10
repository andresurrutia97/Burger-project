import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToogleButton from "../SideDrawer/ToogleButton/ToogleButton";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <ToogleButton className={classes.closedToogle} clicked={props.open} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
