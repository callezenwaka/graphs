import PieChart from './PieChart';
// import { Header, Subscription } from "../partials";
const data = [
  {label: 'A', count: 590},
  {label: 'B', count: 291},
  {label: 'C', count: 348},
  {label: 'D', count: 145},
  {label: 'E', count: 46},
]

const BlogContainer = () => {

  return (
    <div className='flex flex-row flex-wrap justify-between content-center gap-5 md:gap-0 px-2.5 py-5 bg-slate-100'>
      {/* <Header /> */}
      <PieChart items={ data } />
      {/* <Subscription /> */}
    </div>      
  );
};

export default BlogContainer;