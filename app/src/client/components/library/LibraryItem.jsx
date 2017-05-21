import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
