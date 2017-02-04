import React from 'react';

export default class Field extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['number', 'checkbox', 'range', 'select']).isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      caption: React.PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    items: [],
  };

  renderInput() {
    const {caption, items, ...attrs} = this.props;
    return <input {...attrs}/>;
  }

  renderSelect() {
    const {caption, type, items, ...attrs} = this.props;
    return (
      <select {...attrs}>
        {items.map(item => <option key={item.id} value={item.id}>{item.caption}</option>)}
      </select>
    );
  }

  render() {
    const {id, type, caption} = this.props;
    return (
      <div className="field">
        <label htmlFor={id}>{caption}</label>
        {type === 'select' ? this.renderSelect() : this.renderInput()}
      </div>
    );
  }

}
