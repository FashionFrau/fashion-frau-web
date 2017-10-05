import React, { Component } from 'react';

export default (props) => {
    return (
      <nav className="navbar navbar-inner navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand font-ff" href="/">ff</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              <li><a href="#">List</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Add</a></li>
              <li><a href="#">Sing Out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
