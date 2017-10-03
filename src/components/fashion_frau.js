import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLooks } from '../actions';
import LookList from '../container/look_list';

class FashionFrau extends Component {
  componentDidMount() {
      this.props.dispatch(fetchLooks());
  }

  render() {
    return(
      <div>
        <LookList images={this.props.looks}/>
      </div>
    );
  }
}


function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(FashionFrau);
