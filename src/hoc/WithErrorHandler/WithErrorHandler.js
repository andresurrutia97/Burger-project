import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxi/Auxi";
import useHttpErrorHandler from "../../hooks/httpErrorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} close={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
