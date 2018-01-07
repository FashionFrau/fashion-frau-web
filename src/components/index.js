import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../components/common/header'
import HomePage from '../components/home/HomePage'
import LookList from '../container/look_list'
import AddLook from '../container/add_look'
import LogoutHandler from '../components/LogoutHandler'

class App extends Component {

  render() {

    return(
        <div className="container-fluid">
          <Header />
          <Switch>
            <Route path="/looks" exact strict component={LookList} />
            <Route path="/add" exact strict component={AddLook} />
            <Route path="/" exact component={HomePage} />
            <Route path="/signout" exact component={LogoutHandler} />
            <Redirect to="/" />
          </Switch>
      </div>
    );
  }
}

export default App;
