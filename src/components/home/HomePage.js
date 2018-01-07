import React, { Component } from 'react'
import { Link } from 'react-router'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <br />
        <div className="panel panel-default">
          <ul className="list-group">
            <li className="list-group-item">Designed the site as simple as possible for you &#9829;</li>
            <li className="list-group-item">Add and manage your looks</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HomePage;
