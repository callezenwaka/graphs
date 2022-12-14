import React from 'react';
import { useEffect, useRef } from "react";
import { ChartType } from "../../types/index";
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape'
import './PieChart.css';

const PieChart = ({ items }: { items: ChartType[] }) => {
  // const pieChart = useRef<HTMLDivElement>(null);
  const pieChart = useRef<SVGSVGElement>(null);

  useEffect(() => {

    // remove g element tags
    remove();

    drawPieHandler(items);

  }, [items]);

  const remove = () => {
    const g = d3.select(pieChart.current).selectAll('g');
    const pieContainer = d3.select('#pieContainer').selectAll('#visibility');
    if(pieContainer.size()) pieContainer.remove().exit();

    // check the number of existing elements, if greater than 0; remove all existing ones
    if (g.size()) g.remove().exit();
  };

  const drawPieHandler = (items: ChartType[]) => {
    // Define dimensions
    const width = 360;
    const height = 360;
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    const radius = Math.min(width, height) / 2;
    // Get positions for each data object
    const piedata = d3.pie<ChartType>().value(d => d.value)(items);
    // Define arcs for graphing 
    const arc = d3.arc<PieArcDatum<ChartType>>().innerRadius(0).outerRadius(radius)
    // Define colors for graphing 
    const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6'])
    // const colors = d3.scaleOrdinal()
    //   .domain(d3.range(items.length) as unknown as string[])
      // .range([(items) => items.label]);
    //   .range( d3.quantize((t) => d3.interpolateGreens(t * 0.8 + 0.1), items.length)
    //     .reverse() 
    //   );

    // Define the size and position of svg
    const svg = d3.select(pieChart.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // Add tooltip
    const tooldiv = d3.select('#pieContainer')
      .append('div')
      .attr('id', 'visibility')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red')

    // Draw pie
    svg.append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => {
        return colors(d.data.label) as string
      })
      .attr('stroke', 'white')
      .on('mouseover', (e, d) => {
        tooldiv.style('visibility', 'visible')
          .text(`${d.data.label}: ${d.data.value}`)
      })
      .on('mousemove', (e, d) => {
        tooldiv.style('top', (e.pageY - 50) + 'px')
          .style('left', (e.pageX - 50) + 'px')
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden')
      })

    // Add title
    // const title = d3.select('#pieContainer')
    // title.append('text')
    //   .attr('x', (width / 2))
    //   .attr('y', (margin.top / 5 - 10))
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', '16px')
    //   .attr('fill', 'black')
    //   .text('Test data');
  }

  return (
    <div className="pie">
      <section className="pie--section">
        <div id='pieContainer' className="pie--container">
          <h1 className="pie--title">Pie Chart</h1>
          <div className="pie--content">
            <svg ref={pieChart}></svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PieChart;