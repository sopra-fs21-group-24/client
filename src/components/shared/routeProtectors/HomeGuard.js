import React from "react";
import { Redirect } from "react-router-dom";
import { api, getAuthConfig, handleError } from "../../../helpers/api";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <HomeGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const HomeGuard = (props) => {



  
  try {
    let userId = localStorage.getItem("currentUserId");
    const response =  api.get("/users/" + userId);
  } catch (error) {
    return <Redirect to={"/"} />
  }

  return props.children;


  
  // if (localStorage.getItem("token")) {
  //   return props.children;
  // }
  // return <Redirect to={"/"} />;
};
