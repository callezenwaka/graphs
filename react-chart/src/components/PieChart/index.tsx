import React from 'react';
import { ChartType } from '../../types';
import PieChart from './PieChart';
import './PieChart.css';

const PieContainer = ({ items }: { items: ChartType[] }) => {

  return (
    <div className='pie--wrapper'>
      <PieChart items={ items } />
    </div>      
  );
};

export default PieContainer;