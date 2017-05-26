import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon, Panel} from '../common';
import './SettingsPanel.css';

export default class SettingsPanel extends PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  handleHeaderClick = () => {
    const {id, onActivate} = this.props;
    onActivate(id);
  };

  render() {
    const {id, title, icon, active, children} = this.props;
    return (
      <Panel className={classNames(`${id}-settings`, 'settings-panel')} collapsed={!active}>
        <Panel.Header onClick={this.handleHeaderClick}>
          <Icon name={icon}/> <span className="settings-panel-title">{title}</span>
        </Panel.Header>
        <Panel.Body>
          {children}
        </Panel.Body>
      </Panel>
    );
  }

}
