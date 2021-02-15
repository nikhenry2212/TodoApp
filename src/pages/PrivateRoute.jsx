import React from 'react';
import { Redirect, Route } from 'react-router';
import { ID_TOKEN } from '../constants/geral';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(ID_TOKEN);

  return (
    <Route {...rest} render={props => {
      if (token) {
        return <Component {...props} />
      } else {
        return <Redirect to="/"/>
      } 
    }}/>
  )
}
export default PrivateRoute;