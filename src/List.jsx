import React from 'react';

export default function List({ registers }) {
  if (registers.length === 0) {
    return (<div />);
  }
  return (
    <div>
      <ul>
        {registers.map((register) => (
          <li key={register.id}>{register.information}</li>
        ))}
      </ul>
    </div>
  );
}
