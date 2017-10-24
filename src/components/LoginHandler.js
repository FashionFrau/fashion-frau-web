import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import _ from 'lodash'
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'
import { authenticate } from '../actions'
import auth from '../auth/authenticator'

class LoginHandler extends Component {
  constructor(props) {
      super(props)

      this.state = { user: null, message: undefined  }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps
    const cookies = new Cookies()

    if (_.hasIn(user, 'data')) {
      if (_.hasIn(user.data, 'auth_token')) {
        cookies.set('user', user.data, { path: '/', secure: false, httpOnly: false })
        this.setState({user: user.data})
      } else {
        this.setState({message: user.data})
        cookies.remove('user')
      }
    } else {
      cookies.remove('user')
    }
  }

  componentDidMount() {
    const { code } = queryString.parse(location.search)
    if (!_.isUndefined(code)) {
      this.props.dispatch(authenticate(code));
    }
  }


  render() {
    if (auth.isLogged() === true) {
      return(
        <Redirect to="/" />
      )
    } else if (!_.isUndefined(this.state.message)) {
      return(
        <Redirect to="/login" />
      )
    }
    return (
      <div className="loading-msg" id="msg-loading-more">
        Loading
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(LoginHandler);
