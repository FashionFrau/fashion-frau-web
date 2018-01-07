import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Gallery from 'react-photo-gallery'
import { Modal, Button, Row, Col, Panel } from 'react-bootstrap'

import { debounce } from '../utils'
import { fetchLooks, deleteLook } from '../actions'
import { normalizeLooks } from '../services/normalizr/fromFashionFrau'

class LookList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      originalList: [],
      list: [],
      count: 0,
      totalCount: 1,
      pageNum: 1,
      loadedAll: false,
      currentLook: undefined
    };

    this.renderLooks = this.renderLooks.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMoreLooks = this.loadMoreLooks.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { looks } = nextProps;
    const { errorMessage, data, totalCount } = looks

    if(errorMessage) {
      this.setState({ errorMessage: errorMessage })
    } else {

      if(_.isNil(data) || _.isNil(totalCount)) {
        return
      }

      const normalizedData = normalizeLooks(data)
      const count = this.state.list + normalizedData.length


      this.setState({
        list: this.concatUnique(this.state.list.concat(normalizedData)),
        originalList: this.concatUnique(this.state.originalList.concat(data)),
        count: count,
        totalCount: totalCount,
        pageNum: this.state.pageNum + 1,
        loadedAll: this.hasLoadedAll(count,totalCount)
      })
    }
  }

  componentDidMount() {
    this.loadMoreLooks()
    this.loadMoreLooks = debounce(this.loadMoreLooks, 200)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

/******************************************************************************/
/******************************************************************************/

  concatUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
         for(var j=i+1; j<a.length; ++j) {
             if(a[i].id === a[j].id)
                 a.splice(j--, 1);
         }
     }
     return a;
  }
/*********************************** Scroll ***********************************/
  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      this.loadMoreLooks();
    }
  }

  hasLoadedAll(count, totalCount) {
    return parseInt(count) >= parseInt(totalCount)
  }

  loadMoreLooks(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.hasLoadedAll(this.state.count,this.state.totalCount)) {
      this.setState({ loadedAll: true });
      return;
    }

    const urlParams = {
      per_page: '10',
      page: this.state.pageNum,
    };

    this.props.dispatch(fetchLooks(urlParams));
  }
/******************************************************************************/
/********************************* Layout *************************************/

/*********************************** Look *************************************/

  handleOpenModal(event) {
    const look = this.getLookBy(event.target.id)
    this.setState({ showModal: true, currentLook: look });
  }

  handleCloseModal() {
    this.setState({ showModal: false, currentLook: undefined });
  }

  getLookBy(id) {
    const index = _.findIndex(this.state.originalList, ['id', id]);
    return this.state.originalList[index]
  }

  renderModal() {
    if(!this.state.currentLook) {
      return
    }
    const look = this.state.currentLook

    return(
      <div className="static-modal">
        <Modal key="modal" show={this.state.showModal} onHide={this.handleCloseModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg" className="text-center">Look</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <Panel>
                  <Panel.Body>Show number of likes
                    Likes: {look.likes}
                  </Panel.Body>
                </Panel>
              </Col>
              <Col md={6} mdPull={6}>
                <img src={look.lookUrl} className="img-responsive" />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <Button onClick={this.handleCloseModal}>Close</Button>
              </Col>
              <Col md={6} mdPull={6} />
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    )
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
      <div>
        <Gallery
          photos={this.state.list}
          margin={5}
          onClick={this.handleOpenModal}
        />
        {this.renderModal()}
      </div>
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
