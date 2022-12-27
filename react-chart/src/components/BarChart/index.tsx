import React from 'react';
import { ChartType } from '../../types';
import BarChart from './BarChart';
import './BarChart.css';

const BarContainer = ({ items }: { items: ChartType[] }) => {

  return (
    <div className='bar--wrapper'>
      <BarChart items={ items } />
    </div>      
  );
};

export default BarContainer;