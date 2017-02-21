import React from 'react';
import {Source} from '../../../enums';

const SourceInputs = ({inputs}) => {
  const caption = inputs.map(Source.getInputCaption).join(' / ');
  return <div className="source-inputs">{caption || '--'}</div>;
};

SourceInputs.propTypes = {
  inputs: React.PropTypes.arrayOf(React.PropTypes.shape({
    source: Source.isSource,
    inputName: React.PropTypes.string,
  })).isRequired,
};

export default SourceInputs;
