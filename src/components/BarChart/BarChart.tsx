import { useEffect, useRef } from "react";
import { ChartType } from "../../types/index";
// import * as d3 from 'd3';
import './BarChart.css';

const BarChart = ({ items }: { items: ChartType[] }) => {
  const barChart = useRef<SVGSVGElement>(null);
  // Define dimensions
  // const width = 360;
  // const height = 360;
  // const margin = { top: 50, right: 30, bottom: 30, left: 60 }
  useEffect(() => {

    drawBarHandler(items);

  }, [items]);

  const drawBarHandler = (items: ChartType[]) => {
    
  }
  // const drawLineHandler = (items: ChartType[]) => {
  //   const chartwidth = parseInt(d3.select('#lineContainer').style('width')) - margin.left - margin.right
  //   const chartheight = parseInt(d3.select('#lineContainer').style('height')) - margin.top - margin.bottom


  //   const svg = d3.select(barChart.current)
  //     .attr('width', width + margin.left + margin.right)
  //     .attr('height', height + margin.top + margin.bottom)

  //   // x scale
  //   const xScale = d3.scaleBand()
  //     .domain(d3.range(items.length) as unknown as string[])
  //     // .domain([`0, ${width}`])
  //     .range([margin.left, chartwidth - margin.right])
  //     .padding(0.1)

  //   svg.append('g')
  //     .attr('transform', 'translate(0,' + chartheight + ')')
  //     .call(d3.axisBottom(xScale).tickFormat((d, i) => items[i].label).tickSizeOuter(0))

  //   const max = d3.max(items, function (d) { return d.count })

  //   // y scale
  //   const yScale = d3.scaleLinear()
  //     .domain([0, max] as number[])
  //     .range([chartheight, margin.top])

  //   svg.append('g')
  //     .attr('transform', 'translate(' + margin.left + ',0)')
  //     .call(d3.axisLeft(yScale))

  //   // Draw bars
  //   svg.append('g')
  //     .attr('fill', '#65f0eb')
  //     .selectAll('rect')
  //     .data(items)
  //     .join('rect')
  //     // .attr('x', (d, i) => xScale(i))
  //     .attr('x', (d, i): number => xScale('5') as number)
  //     // .attr('x', (d, i): number => xScale(i as unknown as string) as number)
  //     .attr('y', d => yScale(d.count))
  //     // .attr("d", d3.line()
  //     //   .x(function(d) { return x(d.date) })
  //     //   .y(function(d) { return y(d.value) })
  //     //   .x((d) => { return x(d.label); })
  //     //   .y((d) => { return y(d.count); })
  //     // )
  //     .attr('height', d => yScale(0) - yScale(d.count))
  //     .attr('width', xScale.bandwidth())
  // }

  return (
    <div className="bar">
      <section className="bar--section">
        <div className="bar--container">
          <h1 className="bar--title">Bar Chart</h1>
          <div className="bar--content">
            <svg ref={barChart}></svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarChart;