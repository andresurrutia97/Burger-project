import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

//lazy loading: renderizar componentes solo cuando se llaman // Solo es útil cuando los componentes son grandes
const AsyncCheckOut = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);
const AsyncOrders = React.lazy(() => import("./containers/Orders/Orders"));
const AsyncAuth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        {/* Rutas cargadas con lazy loading usando Suspense en Route */}
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <AsyncAuth />
            </Suspense>
          )}
        />
        <Route path="/" component={BurguerBuilder} />5
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncCheckOut />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncOrders />
              </Suspense>
            )}
          />
          <Route
            path="/auth"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <AsyncAuth />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurguerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
