import React from 'react'

function Container({ children, fullWidth = false }) {
  return (
    <div className={fullWidth ? "w-full px-4" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
      {children}
    </div>
  );
}


export default Container;

