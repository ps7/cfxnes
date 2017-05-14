import React, {Component, PropTypes} from 'react';
import Button from './Button';
import Modal from './Modal';

export default class ConfirmDialog extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirm: PropTypes.string,
    cancel: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    confirm: 'Yes',
    cancel: 'No',
    onConfirm: null,
    onCancel: null,
  };

  componentDidMount() {
    addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = event => {
    if (event.keyCode === 27) {
      const {onCancel} = this.props;
      if (onCancel) {
        onCancel();
      }
    }
  }

  render() {
    const {title, message, confirm, cancel, onConfirm, onCancel} = this.props;
    return (
      <Modal className="confirm-dialog">
        <Modal.Header onClose={onCancel}>{title}</Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onCancel}>{cancel}</Button>
          <Button onClick={onConfirm} autoFocus>{confirm}</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}
