import React from "react";
import { Redirect } from "react-router-dom";

export const LobbyGuard = props => {
  if (localStorage.getItem("token")) {
    return props.children;
  }
  return <Redirect to={"/login"} />;
};
