import React, {Component, PropTypes} from 'react';
import {Panel} from '../common';

export default class SettingsPanel extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  defaultProps = {
    children: null,
  };

  handleHeaderClick = () => {
    const {id, onActivate} = this.props;
    onActivate(id);
  };

  render() {
    const {id, active, children, ...otherProps} = this.props;
    return (
      <Panel id={`${id}-panel`} collapsed={!active} onHeaderClick={this.handleHeaderClick} {...otherProps}>
        {children}
      </Panel>
    );
  }

}
