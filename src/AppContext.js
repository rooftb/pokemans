import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [nums, setNums] = useState('151,0');

  function toggleNums(e) {
    setNums(e.target.value);
    console.log('nums toggled ' + nums);
  }

  const value = {
    nums: nums,
    toggleNums: toggleNums,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
