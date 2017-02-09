import React from 'react';
import {Panel} from '../common';

export default class ControlsPanel extends React.Component {

  static id = 'controls';

  static propTypes = {
    collapsed: React.PropTypes.bool,
    onHeaderClick: React.PropTypes.func,
  };

  static defaultProps = {
    collapsed: false,
    onHeaderClick: false,
  }

  render() {
    const {collapsed, onHeaderClick} = this.props;
    return (
      <Panel icon="gamepad" caption="Controls" collapsed={collapsed} onHeaderClick={onHeaderClick}>
        TODO
      </Panel>
    );
  }

}
