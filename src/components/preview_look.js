import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class PreviewLook extends Component {

  /******************************************************************************/
  /********************************* Layout *************************************/
  /******************************************************************************/

  renderGallery() {
    const { look } = this.props

    return(
        <img src={look.lookUrl} className="img-responsive" />
    )
  }

  renderHeader() {
    const { look } = this.props

    return(
          <div className="row look-header">
              <div className="col-xs-3">
                  <img src={look.profileUrl} className="img-responsive img-circle"/>
                  <div className="follow">Follow</div>
              </div>
              <div className="col-xs-5"><div className="profile-name">{look.profileName}</div></div>
              <div className="col-xs-2"><img src="../images/cart.png" /></div>
              <div className="col-xs-2"><img src="../images/share.png" /></div>
          </div>
    )
  }

  renderDescription(){
    const { look } = this.props

    return(
      <div className="row">
        <div className="look-description">
          {look.description}
        </div>
      </div>
    )
  }

  renderFooter() {
    return (
      <div className="row">
        <div className="col-xs-2"></div>
        <div className="col-xs-4">
          <img src="../images/unlike.png" />
        </div>
        <div className="col-xs-4">
          <img src="../images/like.png" />
        </div>
        <div className="col-xs-2"></div>
      </div>
    );
  }

  renderIphone5S() {
    return(
      <div className="marvel-device iphone5s gold">
          <div className="top-bar"></div>
          <div className="sleep"></div>
          <div className="volume"></div>
          <div className="camera"></div>
          <div className="sensor"></div>
          <div className="speaker"></div>
          <div className="screen">
            <div className="scrollable">
                {this.renderGallery()}
                <div className="container-fluid">
                    {this.renderHeader()}
                    {this.renderDescription()}
                    {this.renderFooter()}
                </div>
            </div>
          </div>
          <div className="home"></div>
          <div className="bottom-bar"></div>
      </div>
    )
  }

  render() {
    if(_.isEmpty(this.props.look)) {
      return(<div>No look</div>)
    }
    return(
      <div>
          {this.renderIphone5S()}
      </div>
    );
  }
}

PreviewLook.propTypes = {
  look: PropTypes.object.isRequired
};
