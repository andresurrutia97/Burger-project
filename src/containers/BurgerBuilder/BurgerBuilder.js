import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import axios from "../../axios-orders";
import Aux from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildContronls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";

const burguerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    //crea una array con las claves y despues con el map reemplaza el arreglo de claves por el valor de cada clave
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = { ...props.ings };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildContronls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        cancel={purchaseCancelHandler}
        continue={purchaseContinueHandler}
        totalPrice={props.price}
      />
    );
  }
  // if (this.state.loading) {
  //   orderSummary = <Spinner />;
  // }

  return (
    <Aux>
      <Modal show={purchasing} close={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    error: state.burguerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(burguerBuilder, axios));
