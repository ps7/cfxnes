import {connect} from 'react-redux';
import {setLibraryFilter, fetchLibraryItems} from '../../actions';
import {selectLibrary} from '../../reducers';
import Library from './Library';

const mapStateToProps = state => ({
  ...selectLibrary(state),
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(setLibraryFilter(filter)),
  onItemsReload: () => dispatch(fetchLibraryItems()),
});

const connectLibrary = connect(mapStateToProps, mapDispatchToProps);
export default connectLibrary(Library);
