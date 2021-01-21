import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppProvider(props) {
  const [nums, setNums] = useState('151,0');
  const [modal, setModal] = useState(false);

  function toggleNums(e) {
    setNums(e.target.value);
    console.log('nums toggled ' + nums);
  }

  function toggleModal(e) {
    setModal(!modal);
  }

  const value = {
    nums: nums,
    toggleNums: toggleNums,
    modal: modal,
    toggleModal: toggleModal,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
