import React, { useState } from "react";

import { connect } from "react-redux";
import Aux from "../Auxi/Auxi";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDraweOpenedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const sideDraweClosedHandler = () => {
    setShowSideDrawer(false);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuth} open={sideDraweOpenedHandler} />
      <SideDrawer
        isAuth={props.isAuth}
        closed={sideDraweClosedHandler}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{props.children} </main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
