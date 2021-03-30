import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div>
      {isSignedIn === true ? (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => onRouteChange('signIn')}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => onRouteChange('signIn')}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange('Register')}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
