import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'


export default class LogInPage extends Component {
  
  render() {
    return (
    <div>
      <div className="ff">ff</div>
      <Link to="#" className="enclose btn-login">
        <Image src="../images/instagram-button.png" responsive className="" />
      </Link>
    </div>
    );
  }
}
