import React from 'react';
import Header from './Header';

export default ({main, toolbar}) => (
  <div>
    <Header toolbar={toolbar}/>
    {main}
  </div>
);
