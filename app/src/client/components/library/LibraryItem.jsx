import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {cartridgeSvg} from '../../images';
import './LibraryItem.css';

const LibraryItem = ({id, name, thumbnail}) => (
  <Link className="library-item" to={`/emulator/${id}`}>
    <img className="library-item-thumbnail" src={thumbnail}/>
    <div className="library-item-name">{name}</div>
  </Link>
);

LibraryItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

LibraryItem.defaultProps = {
  thumbnail: cartridgeSvg,
};

export default LibraryItem;
