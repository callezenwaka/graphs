// import { useEffect, useState } from "react";
// import { ChartType } from "../../types/index";
// import Chart from "../../types/Chart";
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape'
import './PieChart.css';
import { useEffect, useRef } from "react";

interface Chart {
  label: string,
  count: number,
}

const PieChart = ({ items }: { items: Chart[] }) => {
  // const pieChart = useRef<HTMLDivElement>(null);
  const pieChart = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    // Get positions for each data object
    const piedata = d3.pie<Chart>().value(d => d.count)(items)
    // Define arcs for graphing 
    const arc = d3.arc<PieArcDatum<Chart>>().innerRadius(0).outerRadius(radius)

    const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6'])

    // Define the size and position of svg
    // var svg = d3.select('#chart')
    // const svg = d3.select(pieChart.current)
    // .append('svg')
    // .attr('width', width)
    // .attr('height', height)
    // .append('g')
    // .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    const svg = d3.select(pieChart.current)
    // .append('svg')
      .attr('width', width)
      .attr('height', height)
      // .style('background-color','yellow')
      .append('g')
      // .attr('transform', 'translate(300,300)')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // Add tooltip
    const tooldiv = d3.select('#chartArea')
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red')

    // Draw pie
    svg.append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
      .attr('d', arc)
      // .attr('fill', (d, i) => colors(i as unknown as string))
      .attr('fill', (d) => {
        return colors(d.data.label) as string
      })
      .attr('stroke', 'white')
      .on('mouseover', (e, d) => {
        tooldiv.style('visibility', 'visible')
          .text(`${d.data.label}: ${d.data.count}`)
      })
      .on('mousemove', (e, d) => {
        tooldiv.style('top', (e.pageY - 50) + 'px')
          .style('left', (e.pageX - 50) + 'px')
      })
      .on('mouseout', () => {
        tooldiv.style('visibility', 'hidden')
      })

  }, [items]);

  return (
    <div className="pie">
      <section className="pie--section">
        <div id='chartArea'>
          <svg ref={pieChart}></svg>
        </div>
      </section>
    </div>
  );
};

export default PieChart;