import React, {Component, PropTypes} from 'react';
import {Button, Icon} from '../../common';
import {Source} from '../../../enums';

export default class SourceInput extends Component {

  static propTypes = {
    input: PropTypes.shape({
      source: Source.isSource,
      inputName: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    onRemove: null,
  };

  handleRemoveClick = () => {
    const {input, onRemove} = this.props;
    onRemove(input);
  }

  render() {
    const {input, onRemove} = this.props;
    return (
      <div className="source-input">
        <Icon name={Source.getInputIcon(input)}/>
        <span>{Source.getInputCaption(input)}</span>
        {onRemove && <Button icon="trash" tooltip="Remove" onClick={this.handleRemoveClick}/>}
      </div>
    );
  }

}
