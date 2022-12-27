import React from 'react';
import Header from './Header';

const HeaderContainer = () => {

  return (
    <div className='flex flex-row flex-wrap justify-between content-center gap-5 md:gap-0 px-2.5 py-5 bg-slate-100'>
      <Header />
    </div>      
  );
};

export default HeaderContainer;