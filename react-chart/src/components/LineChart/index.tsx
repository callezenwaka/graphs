import React from 'react';
import { ChartType } from '../../types';
import LineChart from './LineChart';
import './LineChart.css';

const LineContainer = ({ items }: { items: ChartType[] }) => {

  return (
    <div className='line--wrapper'>
      <LineChart items={ items } />
    </div>      
  );
};

export default LineContainer;