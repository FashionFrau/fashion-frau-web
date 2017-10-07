import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchLooks } from '../actions';
import Measure from 'react-measure'
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

    this.state = {
      errorMessage: '',
      list: [],
      dimensions: {
        width: 800,
        height: 600
      }
    };

    this.props.dispatch(fetchLooks());

    this.renderLooks = this.renderLooks.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);

    this.onResize = this.onResize.bind(this);
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

  onResize(contentRect) {
    console.log(this.refs);
    this.setState({ dimensions: contentRect.bounds })
  }

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

  renderEmpty() {
      return(
        <div className="jumbotron">
          <h2 className="text-center">No results</h2>
        </div>
      )
  }

  renderLooks() {
    const { width, height } = this.state.dimensions
    console.log(width, height);
    return(
      <Measure
       bounds
       onResize={this.onResize} >
       {({ measureRef }) =>
        <div ref={measureRef}>
          <Masonry
            cellCount={this.state.list.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={this.cellRenderer}
            height={height}
            width={width}
          />
        </div>
        }
      </Measure>
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
