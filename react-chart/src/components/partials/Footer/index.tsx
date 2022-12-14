import React from 'react';
import LineChart from './LineChart';
// import { Header, Subscription } from "../partials";

const BlogContainer = () => {

  return (
    <div className='flex flex-row flex-wrap justify-between content-center gap-5 md:gap-0 px-2.5 py-5 bg-slate-100'>
      {/* <Header /> */}
      <LineChart />
      {/* <Subscription /> */}
    </div>      
  );
};

export default BlogContainer;