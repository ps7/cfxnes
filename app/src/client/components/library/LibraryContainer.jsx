import {connect} from 'react-redux';
import {setLibraryFilter, fetchLibraryItems} from '../../actions';
import Library from './Library';

const mapStateToProps = state => ({
  ...state.library,
});

const mapDispatchToProps = dispatch => ({
  onFilterChange: filter => dispatch(setLibraryFilter(filter)),
  onItemsReload: () => dispatch(fetchLibraryItems()),
});

const connectLibrary = connect(mapStateToProps, mapDispatchToProps);
export default connectLibrary(Library);
