import React, { Component } from "react";

import { connect } from "react-redux";
import Aux from "../Auxi/Auxi";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  //utilizarr esta forma del set state cuando el nuevo estado depende del anterior
  sideDraweOpenedHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  sideDraweClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuth}
          open={this.sideDraweOpenedHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          closed={this.sideDraweClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children} </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
