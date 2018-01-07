import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactGridLayout from 'react-grid-layout'
import { Modal, Button, Row, Col, Panel } from 'react-bootstrap'
import Gallery from 'react-photo-gallery'

import { getRecentMedia } from '../actions/instagram'
import PreviewLook from '../components/preview_look'

import { normalizeMedias, normalizeLooks } from '../services/normalizr/fromInstagram'
import { createLook } from '../actions'

class AddLook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      mediaList: [],
      lookList: [],
      currentLook: undefined
    };

    this.handlePublishLook = this.handlePublishLook.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { instagram } = nextProps;
    const { data } = instagram
    const mediaList = normalizeMedias(data)
    const lookList = normalizeLooks(data)

    this.setState({ instagram: instagram, mediaList: mediaList, lookList: lookList })
  }

  componentDidMount() {
    this.props.dispatch(getRecentMedia());
  }
/******************************************************************************/
  handleOpenModal(event) {
    const look = this.getLookBy(event.target.id)
    this.setState({ showModal: true, currentLook: look });
  }

  handleCloseModal() {
    this.setState({ showModal: false, currentLook: undefined });
  }

  getLookBy(id) {
    const index = _.findIndex(this.state.lookList, ['id', id]);
    return this.state.lookList[index]
  }


  handlePublishLook() {
    const look = this.state.currentLook
    if(!_.isObject(look)) {
      return
    }
    this.props.dispatch(createLook(look.id))
    this.handleCloseModal()
  }
/******************************************************************************/
/******************************************************************************/

  renderLook() {
    return(
      <div>
        <PreviewLook look={this.state.currentLook}/>
      </div>
    )
  }

  renderModal() {
    if(!this.state.currentLook) {
      return
    }
    return(
      <div className="static-modal">
        <Modal key="modal" show={this.state.showModal} onHide={this.handleCloseModal} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg" className="text-center">Preview of the Look</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="show-grid">
            	<Col md={6} mdPush={6}>
                <Panel>
              		<Panel.Body>This is an example how the look should appear on the app.</Panel.Body>
              	</Panel>
            	</Col>
            	<Col md={6} mdPull={6}>
                {this.renderLook()}
            	</Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <Button bsStyle="primary" onClick={this.handlePublishLook}>Publish</Button>
              </Col>
              <Col md={6} mdPull={6} />
            </Row>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  renderLooks() {
    return(
      <div>
        <Gallery
          photos={this.state.mediaList}
          margin={5}
          onClick={this.handleOpenModal}
        />
      {this.renderModal()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderLooks()}
      </div>
    );
  }
}


function mapStateToProps({ instagram }) {
  return instagram;
}

export default connect(mapStateToProps)(AddLook);
