import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Icon, Input, LinkButton, Message} from '../common';
import {ActionState} from '../../enums';
import LibraryItem from './LibraryItem';
import connect from './connect';
import './Library.css';

class Library extends PureComponent {

  static propTypes = {
    fetchState: PropTypes.oneOf(ActionState.values).isRequired,
    fetchError: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(LibraryItem.propTypes)).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onItemsReload: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {fetchState, onItemsReload} = this.props;
    if (fetchState === ActionState.NONE) {
      onItemsReload();
    }
  }

  initFilterInput = input => {
    if (input) {
      input.focus();
      input.select();
    }
  }

  renderLoader() {
    return <p><Icon name="circle-o-notch" spin/> Loading items...</p>;
  }

  renderErrorMessage() {
    const {fetchError, onItemsReload} = this.props;
    return (
      <Message className="library-message" type="error">
        <p>{fetchError}</p>
        <p><LinkButton onClick={onItemsReload}>Try reload items</LinkButton></p>
      </Message>
    );
  }

  renderNoDataMessage() {
    const {onItemsReload} = this.props;
    return (
      <Message className="library-message" type="info">
        <p>The library does not contain any item.</p>
        <p><LinkButton onClick={onItemsReload}>Try reload items</LinkButton></p>
      </Message>
    );
  }

  renderFilter() {
    const {filter, onFilterChange} = this.props;
    return <Input className="library-filter" type="search"
                  refInput={this.initFilterInput}
                  value={filter}
                  onChange={onFilterChange}/>;
  }

  renderItems() {
    const {items} = this.props;
    return items.map(item => <LibraryItem key={item.id} {...item}/>);
  }

  render() {
    const {fetchState, items} = this.props;
    return (
      <main className="library">
        <h1>Library</h1>
        {fetchState === ActionState.STARTED && this.renderLoader()}
        {fetchState === ActionState.FAILURE && this.renderErrorMessage()}
        {fetchState === ActionState.SUCCESS && !items.length && this.renderNoDataMessage()}
        {fetchState === ActionState.SUCCESS && items.length && this.renderFilter()}
        {fetchState === ActionState.SUCCESS && items.length && this.renderItems()}
      </main>
    );
  }

}

export default connect(Library);
