import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

//lazy loading: renderizar componentes solo cuando se llaman // Solo es útil cuando los componentes son grandes
const CheckOut = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const app = (props) => {
  const { onTryAutoSignup } = props;
  
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      {/* Rutas cargadas con lazy loading usando Suspense en Route */}
      <Route
        path="/auth"
        render={(props) => (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth {...props} />
          </Suspense>
        )}
      />
      <Route path="/" component={BurguerBuilder} />5
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route
          path="/checkout"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <CheckOut {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/orders"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Orders {...props} />
            </Suspense>
          )}
        />
        <Route
          path="/auth"
          render={(props) => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth {...props} />
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
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
