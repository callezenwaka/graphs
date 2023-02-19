<template>
  <div class="" ref="barChartRef"></div>
</template>

<script setup>
// @ is an alias to /src
import * as d3 from "d3";
// import { data } from "../../../utils/revenue";
import { useStore } from 'vuex';
import { onMounted, onBeforeUnmount, onUnmounted, computed, ref, reactive, watch } from 'vue';

// set the dimensions and margins of the graph
// https://masteringjs.io/tutorials/vue/vue-d3
const barChartRef = ref(0);
const margin = reactive({ top: 30, right: 20, bottom: 30, left: 40 });
const width = ref((barChartRef.value.offsetWidth || 300) - margin.left - margin.right);
const height = ref(360);

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  handleResize();
  handleDraw();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(() => width.value, () => {
  remove()
  handleDraw();
});

onMounted(async () => {
  handleDraw();
});

const remove = () => {
  // TODO: Get svg reference
  const svg = d3.select(barChartRef.value).selectAll('svg');

  // check the number of existing elements, if greater than 0; remove all existing ones
  if (svg.size()) svg.remove().exit();
};

const handleResize = () => {
  if (barChartRef.value.offsetWidth) {
    width.value = barChartRef.value.offsetWidth - margin.left - margin.right;
    return;
  }

  if (window.innerWidth < 400) {
    width.value = 300 - margin.left - margin.right;
    return;
  }
  
  width.value = 550 - margin.left - margin.right;
  return;
};

const handleDraw = async () => {
  // append the svg object to the body of the page
  const svg = d3.select(barChartRef.value)
    .append("svg")
    .attr("width", width.value + margin.left + margin.right)
    .attr("height", height.value + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const data = await handleData();

  // Add X axis
  const x = d3.scaleBand()
    .range([ 0, width.value ])
    .domain(data.map((d) => d.date ))
    .padding(0.2);

  svg.append("g")
    .attr("transform", `translate(0, ${height.value})`)
    .call(d3.axisBottom(x).tickFormat(x => d3.timeFormat('%Y')(x)))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => +d.value)])
    .range([ height.value, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.date))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height.value - y(d.value))
    .attr("fill", "#4682b4");

  svg.append("text")
    .attr("class", "title")
    .attr("x", width.value / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Algoboard Revenue in USD ($)");
};

const handleData = async () => {
  // TODO: Read the data
  const response = await d3.csv('../../../../src/utils/revenue.csv');

  // When reading the csv, I must format variables:
  // const input = (d) => { return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value } };
  return response.map((d) => {
    return { 
      date: d3.timeParse("%Y-%m-%d")(d.date), 
      value: d.value 
    } 
  })

};

</script>

<style scoped>
/* .bar--chart {
  width: 100%;
} */
</style>