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
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    const radius = Math.min(width, height) / 2;
    const innerRadius = 100; // inner radius of pie, in pixels (non-zero for donut)
    const outerRadius = Math.min(width, height) / 2; // outer radius of pie, in pixels
    // Get positions for each data object
    const piedata = d3.pie<ChartType>().value(d => d.value)(items);
    const pieGenerator = d3.pie<ChartType>().value(d => d.value)(items);
    // Define arcs for graphing 
    const arc = d3.arc<PieArcDatum<ChartType>>().innerRadius(0).outerRadius(radius)
    const arcGenerator = d3.arc<PieArcDatum<ChartType>>().innerRadius(innerRadius).outerRadius(outerRadius);

    // Define colors for graphing 
    // const colors = d3.scaleOrdinal(['#ffa822', '#134e6f', '#ff6150', '#1ac0c6', '#dee0e6'])
    const colors = d3.interpolateSpectral;
    // const colors = d3.scaleOrdinal()
    //   .domain(d3.range(items.length) as unknown as string[])
      // .range([(items) => items.label]);
    //   .range( d3.quantize((t) => d3.interpolateGreens(t * 0.8 + 0.1), items.length)
    //     .reverse() 
    //   );

    // Define the size and position of svg
    const svg = d3
      .select(doughnutChart.current)
      .attr('width', width)
      .attr('height', height)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    // const svg = d3
    // .select(element)
    // .append("svg")
    // .attr("preserveAspectRatio", "xMidYMid meet")
    // .attr("height", "100%")
    // .attr("width",  "100%")
    // .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    // .append("g")
    // .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);
  
    //add first line of text in middle  of doughnut
    // svg.append("text")
    //   .attr("dy", ".35em")
    //   .attr("text-anchor", "middle")
    //   .attr("style","font-family")
    //   .attr("font-size","20")
    //   .attr("fill","#000000")
    //   .attr("dy", "0em")
    //   .text("60% ");

    //add second line of text in middle of doughnut
    svg.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("style","font-family")
      .attr("font-size","20")
      .attr("fill","#000000")
      .attr("dy", "1em") // how far apart it shows up
      // .text("complete");


  
    const arcs = svg.selectAll().data(pieGenerator).enter();
    arcs
      .append("path")
      .attr("d", arcGenerator)
      // .style("fill", (d, i) => colors(d.data.label) as string);
      .style("fill", (d:any, i:number) => { 
        // const t:number = i / data.columns.length;
        const t:number = i / items.length;
        console.log(colors(t), items.length)
        return colors(t) as string; 
      });

    //add label inside doughnut chart
    arcs
      .append("text")
      .attr("text-anchor", "middle")
      .text((d) => `${d.data.value}`)
      .style("fill","#000000")
      .style("font-size","30px")
      .attr("transform", (d) => {
        const[x,y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });

    // Add tooltip
    // const tooldiv = d3.select('#doughnutContainer')
    //   .append('div')
    //   .attr('id', 'visibility')
    //   .style('visibility', 'hidden')
    //   .style('position', 'absolute')
    //   .style('background-color', 'red')

    // Draw pie
    // svg.append('g')
    //   .selectAll('path')
    //   .data(piedata)
    //   .join('path')
    //   .attr('d', arc)
    //   .attr('fill', (d) => {
    //     return colors(d.data.label) as string
    //   })
    //   .attr('stroke', 'white')
    //   .on('mouseover', (e, d) => {
    //     tooldiv.style('visibility', 'visible')
    //       .text(`${d.data.label}: ${d.data.value}`)
    //   })
    //   .on('mousemove', (e, d) => {
    //     tooldiv.style('top', (e.pageY - 50) + 'px')
    //       .style('left', (e.pageX - 50) + 'px')
    //   })
    //   .on('mouseout', () => {
    //     tooldiv.style('visibility', 'hidden')
    //   })

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