import React from 'react';
import Header from './Header';

export default function({main, toolbar}) {
  return (
    <div>
      <Header toolbar={toolbar}/>
      <main>{main}</main>
    </div>
  );
}
