import React from 'react';
import { ChartType } from '../../types';
import DoughnutChart from './DoughnutChart';
import './DoughnutChart.css';

const DoughnutContainer = ({ items }: { items: ChartType[] }) => {

  return (
    <div className='doughnut--wrapper'>
      <DoughnutChart items={ items } />
    </div>      
  );
};

export default DoughnutContainer;