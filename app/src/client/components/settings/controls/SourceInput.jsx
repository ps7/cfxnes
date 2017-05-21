import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Tooltip} from '../../common';
import {Source} from '../../../enums';

export default class SourceInput extends PureComponent {

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
        <span>{Source.getInputLabel(input)}</span>
        {onRemove && (
          <Button onClick={this.handleRemoveClick}>
            <Icon name="trash"/>
            <Tooltip>Remove</Tooltip>
          </Button>
        )}
      </div>
    );
  }

}
