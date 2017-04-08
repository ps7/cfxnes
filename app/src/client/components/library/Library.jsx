import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Icon, Field, Message} from '../common';
import {fetchROMs, setROMsFilter} from '../../actions';
import {ActionState} from '../../enums';
import LibraryItem from './LibraryItem';
import './Library.css';

class Library extends Component {

  static propTypes = {
    fetchState: PropTypes.oneOf(ActionState.values).isRequired,
    fetchError: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    roms: PropTypes.arrayOf(LibraryItem.propTypes).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.fetchState === ActionState.NONE) {
      this.fetchROMs();
    }
  }

  fetchROMs() {
    this.props.dispatch(fetchROMs());
  }

  handleReloadItems = event => {
    event.preventDefault();
    this.fetchROMs();
  };

  handleFilterChange = filter => {
    this.props.dispatch(setROMsFilter(filter));
  };

  romPassesFilter = rom => {
    const romName = (rom.name || '').toLowerCase();
    const expression = this.props.filter.toLowerCase();
    return romName.indexOf(expression) >= 0;
  }

  getFilteredROMs() {
    return this.props.roms.filter(this.romPassesFilter);
  }

  render() {
    const {fetchState, fetchError, filter, roms} = this.props;

    return (
      <main className="library">
        <h1>Library</h1>
        {fetchState === ActionState.STARTED && (
          <p><Icon name="circle-o-notch" spin/> Loading items...</p>
        )}
        {fetchState === ActionState.FAILURE && (
          <Message type="error">
            <p>{fetchError}</p>
            <p><a href="#" onClick={this.handleReloadItems}>Try reload items</a></p>
          </Message>
        )}
        {fetchState === ActionState.SUCCESS && !roms.length && (
          <Message type="info">
            <p>The library does not contain any item.</p>
            <p><a href="#" onClick={this.handleReloadItems}>Try reload items</a></p>
          </Message>
        )}
        {fetchState === ActionState.SUCCESS && roms.length > 0 && (
          <Field id="library-filter" type="search" value={filter} onChange={this.handleFilterChange}/>
        )}
        {fetchState === ActionState.SUCCESS && roms.length > 0 && (
          this.getFilteredROMs().map(rom => <LibraryItem key={rom.id} {...rom}/>)
        )}
      </main>
    );
  }

}

const mapStateToProps = state => ({
  ...state.library,
});

export default connect(mapStateToProps)(Library);
