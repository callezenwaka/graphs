// import { useEffect, useState } from "react";
// import { Chart } from "../../types/index";
import './PieChart.css';

const PieChart = () => {
  // useEffect(() => {
  //   setBlogs(data.blogs || []);
  //   // console.log('blogs: ', blogs);
  // }, [data]);

  return (
    <div className="blog">
      <section className="blog--main wrapper--container">
        <div className="blog--title">
          <h1 className="blog--heading">Latest Blogs</h1>
        </div>
        <div className="blog--content">
        </div>
      </section>
    </div>
  );
};

export default PieChart;