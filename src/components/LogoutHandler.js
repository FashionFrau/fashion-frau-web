import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { logout } from '../actions'
import { connect } from 'react-redux'

class LogoutHandler extends Component {

  constructor(props) {
    super(props)

    this.state = {redirect: false}
  }

  componentWillMount() {
    const cookies = new Cookies()
    cookies.remove('user')

    this.props.dispatch(logout())
  }

  render() {
    return(
      <Redirect to="/login" />
    )
    return(
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(LogoutHandler);
