import React from 'react';
import {Button, Icon} from '../../common';
import {Source} from '../../../enums';

export default class SourceInput extends React.Component {

  static propTypes = {
    input: React.PropTypes.shape({
      source: Source.isSource,
      inputName: React.PropTypes.string,
    }).isRequired,
    onRemove: React.PropTypes.func,
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
