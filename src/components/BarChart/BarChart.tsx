import { useEffect, useRef, useState } from "react";
import { ChartType } from "../../types/index";
import * as d3 from 'd3';
import './BarChart.css';

const BarChart = ({ items }: { items: ChartType[] }) => {
  const [width, setWidth] = useState(360);
  const [height, setHeight] = useState(360);
  // const margin = { top: 30, right: 30, bottom: 30, left: 30 }
  const barChart = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    setWidth(360);
    setHeight(360);

    // drawBarHandler(items);

    // remove g element tags
    remove();

    // 
    const svg = d3.select(barChart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    // x axis scale
    const xScale = d3.scaleBand()
      .domain(d3.range(items.length) as unknown as string[])
      .range([margin.left, width + margin.right])
      .padding(0.1)

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).tickFormat((d, i) => items[i].label).tickSizeOuter(0))

    const max = d3.max(items, function (d) { return d.value })

    // y axis scale
    const yScale = d3.scaleLinear()
      .domain([0, max] as number[])
      .range([height, margin.top])

    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(yScale))

    // Draw bars
    svg.append('g')
      .attr('fill', '#000000')
      .selectAll('rect')
      .data(items)
      .join('rect')
      .attr('x', (d, i) => xScale(i as unknown as string) as number)
      .attr('y', d => yScale(d.value))
      .attr('height', d => yScale(0) - yScale(d.value))
      .attr('width', xScale.bandwidth())

    // Add title 
    // svg.append('text')
    //   .attr('x', (width / 2))
    //   .attr('y', (margin.top / 5 - 10))
    //   .attr('text-anchor', 'middle')
    //   .attr('font-size', '16px')
    //   .attr('fill', 'black')
    //   .text('Test data');

  }, [items, width, height]);

  const remove = () => {
    const g = d3.select(barChart.current).selectAll('g');

    // check the number of existing elements, if greater than 0; remove all existing ones
    if (g.size()) {
      g.remove().exit();
    }
  };

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