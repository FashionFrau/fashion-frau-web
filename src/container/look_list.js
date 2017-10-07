import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchLooks, deleteLook } from '../actions'
import Gallery from 'react-photo-gallery'

class LookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      list: [],
      currentImage: 0
    };

    this.props.dispatch(fetchLooks());

    this.renderLooks = this.renderLooks.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { looks } = nextProps;
    const { errorMessage, data} = looks

    this.setState({
      errorMessage: errorMessage,
      list: data
    })
  }

  /****************************************************************************/
  /********************************* Layout ***********************************/
  /****************************************************************************/


  /********************************* Look *************************************/

  onDeleteClick(event, obj) {
    const { photo: { id } } = obj

    this.props.dispatch(deleteLook(id, () => {
      this.props.history.push("/");
    }));
  }

/********************************* Error **************************************/

  renderErrorMessage() {
    return (
      <p style={{ backgroundColor: '#e99', padding: 10, color: 'white' }}>
        <b>{this.state.errorMessage}</b>
      </p>
    )
  }

/********************************* No data ************************************/

  renderEmpty() {
      return(
        <div className="jumbotron">
          <h2 className="text-center">No results</h2>
        </div>
      )
  }

/********************************* Looks **************************************/
  renderLooks() {

    return(
      <Gallery
        photos={this.state.list}
        margin={5}
        onClick={this.onDeleteClick}
      />
    )
  }

  render() {
    if(this.state.errorMessage) {
      return(
        <div>
            {this.renderErrorMessage()}
        </div>
      );
    }

    if(this.state.list.length === 0){
      return(
        <div>
          {this.renderEmpty()}
        </div>
      )
    }

    return (
      <div>
        <div className="font-ff text-center ff-title">Looks</div>
          {this.renderLooks()}
      </div>
    );
  }
}

function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(LookList);
