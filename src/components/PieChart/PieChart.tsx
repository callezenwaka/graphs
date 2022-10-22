import { useEffect, useRef } from "react";
import { ChartType } from "../../types/index";
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape'
import './PieChart.css';

const PieChart = ({ items }: { items: ChartType[] }) => {
  // const pieChart = useRef<HTMLDivElement>(null);
  const pieChart = useRef<SVGSVGElement>(null);
  useEffect(() => {

    drawPieHandler(items);

  }, [items]);

  const drawPieHandler = (items: ChartType[]) => {
    // Define dimensions
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    // Get positions for each data object
    const piedata = d3.pie<ChartType>().value(d => d.count)(items)
    // Define arcs for graphing 
    const arc = d3.arc<PieArcDatum<ChartType>>().innerRadius(0).outerRadius(radius)
    // Define colors for graphing 
    const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6'])
    // const colors = d3.scaleOrdinal(d3.schemeCategory10);

    // Define the size and position of svg
    const svg = d3.select(pieChart.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // Add tooltip
    const tooldiv = d3.select('#pieContainer')
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