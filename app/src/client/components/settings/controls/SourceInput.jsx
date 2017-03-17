import React from 'react';
import {Button, Icon} from '../../common';
import {Source} from '../../../enums';

export default class SourceInput extends React.Component {

  static propTypes = {
    input: React.PropTypes.shape({
      source: Source.isSource,
      inputName: React.PropTypes.string,
    }).isRequired,
    onRemoveClick: React.PropTypes.func,
  };

  static defaultProps = {
    onRemoveClick: null,
  };

  handleRemoveClick = () => {
    const {input, onRemoveClick} = this.props;
    onRemoveClick(input);
  }

  render() {
    const {input, onRemoveClick} = this.props;
    return (
      <div className="source-input">
        <Icon name={Source.getInputIcon(input)}/>
        <span>{Source.getInputCaption(input)}</span>
        {onRemoveClick && <Button icon="trash" tooltip="Remove" onClick={this.handleRemoveClick}/>}
      </div>
    );
  }

}
