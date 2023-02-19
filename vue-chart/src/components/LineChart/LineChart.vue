<template>
  <div class="" ref="lineChartRef"></div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import type Revenue from "@/types/Revenue";
import * as d3 from "d3";
// import { useStore } from "vuex";
import {
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  reactive,
  watch,
} from "vue";

interface Input {
  label: string;
  value: number;
}

// set the dimensions and margins of the graph
// https://d3-graph-gallery.com/graph/line_basic.html
const lineChartRef = ref<HTMLElement | null>(null);
// const widthOffSet = ref<number>(lineChartRef?.value?.offsetWidth || 0);
const margin = reactive({ top: 30, right: 20, bottom: 30, left: 40 });
const height = ref<number>(360);
const width = ref<number>(
  (lineChartRef?.value?.offsetWidth || 300) - margin.left - margin.right
);
const revenue = ref([
  {
    label: "2013-06-30",
    value: 660,
  },
  {
    label: "2014-12-31",
    value: 814,
  },
  {
    label: "2015-06-30",
    value: 1131,
  },
  {
    label: "2016-12-31",
    value: 1267,
  },
  {
    label: "2017-06-30",
    value: 1514,
  },
  {
    label: "2018-12-31",
    value: 1763,
  },
  {
    label: "2019-06-30",
    value: 2653,
  },
  {
    label: "2020-12-31",
    value: 6148,
  },
  {
    label: "2021-06-30",
    value: 12394,
  },
  {
    label: "2022-12-31",
    value: 2162,
  },
]);
const data = computed((): Revenue[] => {
  return revenue.value.map((d: Input) => {
    return {
      label: d3.timeParse("%Y-%m-%d")(d.label)!,
      value: d.value,
    };
  });
});

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  // handleResize();
  handleDraw();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => width.value,
  () => {
    remove();
    handleResize();
    handleDraw();
  }
);

const remove = () => {
  // TODO: Get svg reference
  const svg = d3.select(lineChartRef.value).selectAll("svg");

  // check the number of existing elements, if greater than 0; remove all existing ones
  if (svg.size()) svg.remove().exit();
};

const handleResize = () => {
  if (lineChartRef?.value?.offsetWidth) {
    console.log(lineChartRef?.value?.offsetWidth);
    width.value = lineChartRef?.value?.offsetWidth - margin.left - margin.right;
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
  const svg = d3
    .select(lineChartRef.value)
    .append("svg")
    .attr("width", width.value + margin.left + margin.right)
    .attr("height", height.value + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // const data: User[] = await handleData();

  // Add X axis --> it is a date format
  const x = d3
    .scaleTime()
    .domain(d3.extent(data.value, (d) => d.label) as Date[])
    .range([0, width.value]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height.value})`)
    .call(d3.axisBottom(x));

  // const max = d3.max(data.value, (d): number => d.value);

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data.value, (d: Revenue) => +d.value)] as number[])
    .range([height.value, 0]);

  svg.append("g").call(d3.axisLeft(y));

  // Add the line
  svg
    .append("path")
    .datum(data.value)
    .attr("fill", "none")
    .attr("stroke", "#4682b4")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line<Revenue>()
        .x((d) => x(d.label))
        .y((d) => y(d.value))
    );

  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width.value / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Company Revenue");
};
</script>

<style scoped>
/* .line--chart {
  width: 100%;
} */
</style>
