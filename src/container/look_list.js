import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Gallery from 'react-photo-gallery'
import { Modal, Button } from 'react-bootstrap'

import { debounce } from '../utils'
import { fetchLooks, deleteLook } from '../actions'

class LookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      list: [],
      count: 0,
      totalCount: 1,
      pageNum: 1,
      loadedAll: false
    };

    this.props.dispatch(fetchLooks());

    this.renderLooks = this.renderLooks.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMoreLooks = this.loadMoreLooks.bind(this);

    this.openLook = this.openLook.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { looks } = nextProps;
    const { errorMessage, data, totalCount } = looks

    if(errorMessage) {

      this.setState({ errorMessage: errorMessage })
    } else {

      const count = this.state.list.length + data.length

      this.setState({
        list: this.state.list ? this.state.list.concat(data) : list,
        count: count,
        totalCount: totalCount,
        pageNum: this.state.pageNum + 1,
        loadedAll: count >= totalCount
      })
    }
  }

  componentDidMount() {
    this.loadMoreLooks();
    this.loadMoreLooks = debounce(this.loadMoreLooks, 200);
    window.addEventListener('scroll', this.handleScroll);
  }

/******************************************************************************/
/******************************************************************************/

/*********************************** Scroll ***********************************/
  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      this.loadMoreLooks();
    }
  }

  loadMoreLooks(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.count > this.state.totalCount) {
      this.setState({ loadedAll: true });
      return;
    }

    const urlParams = {
      per_page: '10',
      page: this.state.pageNum,
    };

    this.props.dispatch(fetchLooks(urlParams));
  }

/*********************************** Look *************************************/

  openLook(event, obj) {
    this.setState({
      currentLook: obj.index,
      modalIsOpen: true,
    });
  }

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
/********************************* Layout *************************************/


/********************************* No data ************************************/
  renderEmpty() {
      return(
        <div className="jumbotron">
          <h2 className="text-center">No results</h2>
        </div>
      )
  }

/********************************* Looks **************************************/
  renderModal() {
    let lgClose = () => this.setState({ modalIsOpen: false });

    return(
      <Modal show={this.state.modalIsOpen} onHide={lgClose} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  renderLooks() {
    return(
      <Gallery
        photos={this.state.list}
        margin={5}
        onClick={this.openLook}
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
        <div className="text-center ff-title">Looks</div>
          {this.renderLooks()}
          {/* FIXME React 16 does not support modal for now... wait until they fix it */}
          {/* {this.renderModal()} */}
          {!this.state.loadedAll && (
            <div className="loading-msg" id="msg-loading-more">
              Loading
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(LookList);
