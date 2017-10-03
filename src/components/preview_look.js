import React, { Component } from 'react';

export default class PreviewLook extends Component {

  /******************************************************************************/
  /********************************* Layout *************************************/
  /******************************************************************************/


  renderGallery() {
    const { look } = this.props
      return(
        <div>
            <img src={look.lookUrl}/>
        </div>
      )
  }

  renderLook() {
    return(
      <div>
          {this.renderGallery()}
      </div>
    )
  }

  renderIphone5s() {
    return(
      <div className="marvel-device iphone5s">
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="volume"></div>
          <div className="camera"></div>
          <div className="sensor"></div>
          <div className="speaker"></div>
          <div className="screen">
              {this.renderLook()}
          </div>
          <div className="home"></div>
          <div className="bottom-bar"></div>
      </div>
    )
  }

  render() {
    return(
      <div>
          {this.renderIphone5s()}
      </div>
    );
  }
}
