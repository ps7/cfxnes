import React from 'react';

export default function({params}) {
  const {romId} = params;
  return (
    <div>
      <h1>Emulator</h1>
      ROM ID: {romId || '?'}
    </div>
  );
}
