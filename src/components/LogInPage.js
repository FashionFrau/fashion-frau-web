import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { api } from '../services';


export default class LogInPage extends Component {

  render() {
    return (
      <div>
        <div className="ff">ff</div>
        <a href={api.authUrl()} className="enclose btn-login">
         <Image src="../images/instagram-button.png" responsive />
        </a>
      </div>
    );
  }
}
