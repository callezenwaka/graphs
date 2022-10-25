import { useEffect, useRef, useState } from "react";
import { ChartType } from "../../types/index";
import * as d3 from 'd3';
import './LineChart.css';

const LineChart = ({ items }: { items: ChartType[] }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const lineChart = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 }
    setWidth(360);
    setHeight(360);

    // drawLineHandler();

    // remove g element tags
    remove();

    // set svg component
    const svg = d3.select(lineChart.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // x axis scale
    const xScale = d3.scaleBand()
      .domain(d3.range(items.length) as unknown as string[])
      .range([margin.left, width + margin.right])
      .padding(1);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).tickFormat((d, i) => items[i].label).tickSizeOuter(0))

    const max = d3.max(items, (d) => d.value);

    // y axis scale
    const yScale = d3.scaleLinear()
      .domain([0, max] as number[])
      .range([height, margin.top]);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Draw line
    svg.append('path')
      .datum(items)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<ChartType>()
        .x((d, i) => xScale(i as unknown as string) as number)
        .y((d) => yScale(d.value))
        // .curve(d3.curveCardinal)
      );

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
    const g = d3.select(lineChart.current).selectAll('g');

    // check the number of existing elements, if greater than 0; remove all existing ones
    if (g.size()) {
      g.remove().exit();
    }
  };

  return (
    <div className="line">
      <section className="line--section">
        <div id="lineContainer" className="line--container">
          <h1 className="line--title">Line Chart</h1>
          <div className="line--content">
            <svg ref={lineChart}></svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LineChart;