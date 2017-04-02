import React, {Component, PropTypes} from 'react';
import {Button, Icon, ConfirmDialog} from '../../common';
import {ActionState} from '../../../enums';

export default class ResetPanelItem extends Component {

  static propTypes = {
    caption: PropTypes.string.isRequired,
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
    const {caption, confirmTitle, confirmMessage} = this.props;

    return <ConfirmDialog title={confirmTitle}
                          message={confirmMessage}
                          confirmCaption={caption}
                          cancelCaption="Cancel"
                          onConfirm={this.handleConfirm}
                          onCancel={this.handleCancel}/>;
  }

  renderButton() {
    const {state, caption, progressMessage, failureMessage} = this.props;

    if (state === ActionState.STARTED) {
      return <Button disabled><Icon name="circle-o-notch" spin/> {progressMessage}</Button>;
    }
    if (state === ActionState.FAILURE) {
      return <Button icon="exclamation-triangle" caption={failureMessage} disabled/>;
    }
    if (state === ActionState.SUCCESS || state === true) {
      return <Button icon="check" caption="Done" disabled/>;
    }
    return <Button caption={caption} onClick={this.handleAction}/>;
  }

  render() {
    const {confirmVisible} = this.state;
    const {description} = this.props;

    return (
      <div className="reset-panel-item">
        {confirmVisible && this.renderConfirm()}
        <div className="reset-button">{this.renderButton()}</div>
        <div className="reset-description">{description}</div>
      </div>
    );
  }

}
