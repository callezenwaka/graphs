import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ChartType } from '../../types/index';
import './BarChart.css';

const BarChart = ({ items }: { items: ChartType[] }) => {
  const barChart = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 360 });

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };

    const svg = d3.select(barChart.current);

    const updateChart = () => {
      const { width, height } = barChart.current.getBoundingClientRect();
      setDimensions({ width, height });

      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      drawChart();
    };

    const drawChart = () => {
      const xScale = d3.scaleBand()
        .domain(d3.range(items.length) as unknown as string[])
        .range([margin.left, dimensions.width + margin.right])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(items, d => d.value) as number])
        .range([dimensions.height, margin.top]);

      svg.select('.x-axis')
        .attr('transform', `translate(0, ${dimensions.height})`)
        .call(d3.axisBottom(xScale).tickFormat((d, i) => items[i].label).tickSizeOuter(0));

      svg.select('.y-axis')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));

      svg.select('.bars')
        .attr('fill', '#000000')
        .selectAll('rect')
        .data(items)
        .join('rect')
        .attr('x', (d, i) => xScale(i as unknown as string) as number)
        .attr('y', d => yScale(d.value))
        .attr('height', d => dimensions.height - yScale(d.value))
        .attr('width', xScale.bandwidth());
    };

    updateChart();

    // Event listener for window resize
    window.addEventListener('resize', updateChart);

    return () => {
      window.removeEventListener('resize', updateChart);
    };
  }, [items, dimensions]);

  return (
    <div className="bar">
      <section className="bar--section">
        <div className="bar--container">
          <h1 className="bar--title">Bar Chart</h1>
          <div className="bar--content">
            <svg ref={barChart}>
              <g className="x-axis" />
              <g className="y-axis" />
              <g className="bars" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarChart;
