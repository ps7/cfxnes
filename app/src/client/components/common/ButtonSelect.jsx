import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {optionsPropType} from './propTypes';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

export default class ButtonSelect extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    options: optionsPropType.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    value: null,
    onChange: null,
  };

  handleValueChange = event => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(event.target.getAttribute('data-value'));
    }
  }

  renderOption = ({label, value}) => {
    return (
      <Button key={value} data-value={value}
              active={value === this.props.value}
              onClick={this.handleValueChange}>
        {label}
      </Button>
    );
  };

  render() {
    const {className, options, value, onChange, ...attrs} = this.props;
    return (
      <ButtonGroup className={classNames('button-select', className)} {...attrs}>
        {options.map(this.renderOption)}
      </ButtonGroup>
    );
  }

}
