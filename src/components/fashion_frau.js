import React, { Component } from 'react'
import PreviewLook from '../components/preview_look'
import {fetchLook} from '../actions'

import { connect } from 'react-redux';

class FashionFrau extends Component {
  constructor(props) {
    super(props)

    this.state = { look: {} }

    this.props.dispatch(fetchLook(1))
  }

  componentWillReceiveProps(nextProps) {
    const { look } = nextProps
    const { data } = look

    this.setState({ look: data })
  }

  render() {
    return(
      <div>
        <PreviewLook look={this.state.look} />
      </div>
    );
  }
}


function mapStateToProps({ looks }) {
  return { look: looks };
}

export default connect(mapStateToProps)(FashionFrau);
