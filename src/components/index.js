import React, { Component } from 'react'

import Header from '../components/header'
import LookList from '../container/look_list'

export default class App extends Component {

  render() {
    return(
        <div className="container-fluid">
          <Header />
          <LookList />
      </div>
    );
  }
}
