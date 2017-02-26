import React from 'react';
import Button from './Button';
import Modal from './Modal';

export default class ConfirmDialog extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    confirmCaption: React.PropTypes.string,
    cancelCaption: React.PropTypes.string,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  };

  static defaultProps = {
    confirmCaption: 'Yes',
    cancelCaption: 'No',
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
    const {title, message, confirmCaption, cancelCaption, onConfirm, onCancel} = this.props;
    return (
      <Modal>
        <Modal.Header title={title} onClose={onCancel}/>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button caption={cancelCaption} onClick={onCancel}/>
          <Button caption={confirmCaption} onClick={onConfirm} focus/>
        </Modal.Footer>
      </Modal>
    );
  }

}
