import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, ConfirmDialog} from '../../common';
import {ActionState} from '../../../enums';
import './ResetSettingsItem.css';

export default class ResetSettingsItem extends PureComponent {

  static propTypes = {
    action: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    confirmTitle: PropTypes.string.isRequired,
    confirmMessage: PropTypes.string.isRequired,
    progressMessage: PropTypes.string,
    failureMessage: PropTypes.string,
    state: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(ActionState.values),
    ]).isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    progressMessage: null,
    failureMessage: null,
  }

  constructor(props) {
    super(props);
    this.state = {confirmVisible: false};
  }

  handleAction = () => {
    this.setState({confirmVisible: true});
  }

  handleConfirm = () => {
    this.setState({confirmVisible: false});
    this.props.onConfirm();
  }

  handleCancel = () => {
    this.setState({confirmVisible: false});
  }

  renderConfirm() {
    const {action, confirmTitle, confirmMessage} = this.props;

    return <ConfirmDialog title={confirmTitle}
                          message={confirmMessage}
                          confirm={action}
                          cancel="Cancel"
                          onConfirm={this.handleConfirm}
                          onCancel={this.handleCancel}/>;
  }

  renderButton() {
    const {state, action, progressMessage, failureMessage} = this.props;

    if (state === ActionState.STARTED) {
      return (
        <Button disabled>
          <Icon name="circle-o-notch" spin/> {progressMessage}
        </Button>
      );
    }
    if (state === ActionState.FAILURE) {
      return (
        <Button disabled>
          <Icon name="exclamation-triangle"/> {failureMessage}
        </Button>
      );
    }
    if (state === ActionState.SUCCESS || state === true) {
      return (
        <Button disabled>
          <Icon name="check"/> Done
        </Button>
      );
    }
    return <Button onClick={this.handleAction}>{action}</Button>;
  }

  render() {
    const {confirmVisible} = this.state;
    const {description} = this.props;

    return (
      <div className="reset-settings-item">
        {confirmVisible && this.renderConfirm()}
        <div className="reset-button">{this.renderButton()}</div>
        <div className="reset-description">{description}</div>
      </div>
    );
  }

}
