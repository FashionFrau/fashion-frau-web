import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchLooks } from '../actions';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 250,
  fixedWidth: true
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 250,
  spacer: 10
})

class LookList extends Component {

  constructor(props) {
    super(props);

    this.state = { errorMessage: '', list: [] };

    this.props.dispatch(fetchLooks());

    this.renderLooks = this.renderLooks.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { looks } = nextProps;
    const { errorMessage, data} = looks

    this.setState({
      errorMessage: errorMessage,
      list: data
    })
  }

  /******************************************************************************/
  /********************************* Layout *************************************/
  /******************************************************************************/

  renderErrorMessage() {
    return (
      <p style={{ backgroundColor: '#e99', padding: 10, color: 'white' }}>
        <b>{this.state.errorMessage}</b>
      </p>
    )
  }

  cellRenderer ({ index, key, parent, style }) {
    const datum = this.state.list[index]

    return (
      <CellMeasurer
          cache={cache}
          index={index}
          key={key}
          parent={parent}
      >
          <div style={style}>
              <img
                  src={datum.source}
                  style={{
                      height: 250,
                      width: 250
                  }}
              />
          </div>
      </CellMeasurer>
    )
  }

  renderLooks() {
    return(
          <Masonry
            cellCount={this.state.list.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={this.cellRenderer}
            height={800}
            width={800}
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

    return (
      <div>
          <h2>Looks</h2>
          {this.renderLooks()}
      </div>
    );
  }
}

function mapStateToProps({ looks }) {
  return { looks };
}

export default connect(mapStateToProps)(LookList);
