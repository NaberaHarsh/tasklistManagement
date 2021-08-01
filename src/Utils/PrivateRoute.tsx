import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props: any) => {
  const Component = props.component;
  const { uid } = props;

  return (
    <Route
      render={() => (uid ? <Component {...props} /> : <Redirect to="/Login" />)}
    />
  );
};
