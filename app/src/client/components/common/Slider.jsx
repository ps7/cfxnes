import React from 'react';
import RangeSlider from 'react-rangeslider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'react-rangeslider/lib/index.css';
import './Slider.css';

const Slider = ({className, disabled, ...attrs}) => (
  <RangeSlider className={classNames(className, {disabled})} {...attrs}/>
);

Slider.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Slider.defaultProps = {
  className: null,
  disabled: false,
};

export default Slider;
