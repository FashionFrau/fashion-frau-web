import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import App from './components'
import LogInPage from './components/LogInPage'
import LoginHandler from './components/LoginHandler'

import auth from './auth/authenticator'


//Private router function
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>  auth.isLogged() === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
  )
}

export default (
  <div>
    <Switch>
      <Route path="/login" component={LogInPage} />
      <Route path="/auth/callback" component={LoginHandler} />
      <PrivateRoute path="/" component={App} />
      <Redirect to="/login" />
    </Switch>
  </div>
);
