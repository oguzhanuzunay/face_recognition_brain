import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      {console.log(name, entries)}
      <div className="white f3">{`${name}, your current Score is ...`}</div>
      <div className="white f1">{`${entries}`}</div>
    </div>
  );
};

export default Rank;
