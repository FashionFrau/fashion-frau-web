import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized';

// Array of images with captions
var list = [];

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

function cellRenderer ({ index, key, parent, style }) {
  const datum = list[index]

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


function renderLooks() {
  return(
        <Masonry
          cellCount={list.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          height={800}
          width={800}
        />
  )
}

const LookList = (props) => {

  list = props.looks

  if (!list) {
      return <div>Loading...</div>;
  }

  return (
    <div>
        <h2>Looks</h2>
        {renderLooks()}
    </div>
  );

}

export default LookList;
