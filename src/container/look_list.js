import _ from 'lodash';
import React from 'react';

function renderLook(looks) {
    return _.map(looks, look => {
      return (
        <li className="list-group-item" key={look.id}>
          <img src={look.lookUrl}></img>
        </li>
      );
    });
}

const LookList = (props) => {

  return (
    <div>
        <h2>Basic</h2>
        <ul className="list-group">
          {renderLook(props.images)}
        </ul>
    </div>
  );
}


export default LookList;
