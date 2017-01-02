import React from 'react';

export default function({params}) {
  const {romId} = params;
  return (
    <main className="emulator">
      <h1>Emulator</h1>
      ROM ID: {romId || '?'}
    </main>
  );
}
