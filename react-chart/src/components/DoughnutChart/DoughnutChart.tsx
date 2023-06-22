import React from 'react';
import { useEffect, useRef } from "react";
import { ChartType } from "../../types/index";
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape'
import './DoughnutChart.css';

const DoughnutChart = ({ items }: { items: ChartType[] }) => {
  // const doughnutChart = useRef<HTMLDivElement>(null);
  const doughnutChart = useRef<SVGSVGElement>(null);

  useEffect(() => {

    // remove g element tags
    remove();

    drawPieHandler(items);

  }, [items]);

  const remove = () => {
    const g = d3.select(doughnutChart.current).selectAll('g');
    const doughnutContainer = d3.select('#doughnutContainer').selectAll('#visibility');
    if(doughnutContainer.size()) doughnutContainer.remove().exit();

    // check the number of existing elements, if greater than 0; remove all existing ones
    if (g.size()) g.remove().exit();
  };

  const drawPieHandler = (items: ChartType[]) => {
    // Define dimensions
    const width = 360;
    const height = 360;
    const innerRadius = 100; // inner radius of pie, in pixels (non-zero for donut)
    const outerRadius = Math.min(width, height) / 2; // outer radius of pie, in pixels

    // Get positions for each data object
    const piedata = d3.pie<ChartType>().value(d => d.value)(items);

    // Define arcs for graphing 
    const pieArc = d3.arc<PieArcDatum<ChartType>>().innerRadius(innerRadius).outerRadius(outerRadius);

    // Define colors for graph arcs 
    const colors = d3.interpolateSpectral;

    // Add tooltip
    const tooldiv = d3.select('#doughnutContainer')
      .append('div')
      .attr('id', 'visibility')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red')

    // Define the size and position of svg
    const svg = d3
      .select(doughnutChart.current)
      .attr('width', width)
      .attr('height', height)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
      
    // generate arcs
    const arcs = svg.selectAll()
      .data(piedata)
      .enter();

    arcs
      .append("path")
      .attr("d", pieArc)
      .attr("fill", (d:any, i:number) => { 
        const t:number = i / items.length;
        return colors(t) as string; 
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
      });

    //add label inside doughnut chart
    arcs
      .append("text")
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.value}`)
      .style("fill","#000000")
      .style("font-size","30px")
      .attr("transform", (d) => {
        const[x,y] = pieArc.centroid(d);
        return `translate(${x}, ${y})`;
      });

    // Add title
    // const title = d3.select('#doughnutContainer')
    // title.append('text')
    //   .attr('x', (width / 2))
    //   .attr('y', (margin.top / 5 - 10))
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', '16px')
    //   .attr('fill', 'black')
    //   .text('Test data');
  }

  return (
    <div className="doughnut">
      <section className="doughnut--section">
        <div id='doughnutContainer' className="doughnut--container">
          <h1 className="doughnut--title">Doughnut Chart</h1>
          <div className="doughnut--content">
            <svg ref={doughnutChart}></svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoughnutChart;