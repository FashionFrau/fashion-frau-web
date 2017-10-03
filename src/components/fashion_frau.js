import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLooks } from '../actions';
import LookList from '../container/look_list';

class FashionFrau extends Component {
  componentDidMount() {
      this.props.dispatch(fetchLooks());
  }

  renderErrorMessage(errorMessage) {
    return (
      <p style={{ backgroundColor: '#e99', padding: 10, color: 'white' }}>
        <b>{errorMessage}</b>
      </p>
    )
  }

  render() {
    const { looks } = this.props;
    if(looks.error){
      return(
        <div>
          {this.renderErrorMessage(looks.error)}
        </div>
      );
    }
    return(
      <div>
        <LookList images={looks}/>
      </div>
    );
  }
}

function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(FashionFrau);
