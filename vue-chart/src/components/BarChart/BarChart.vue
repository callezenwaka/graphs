<template>
  <div class="" ref="barChartRef"></div>
</template>

<script setup lang="ts">
// @ is an alias to /src
// import type Revenue from "@/types/Revenue";
import * as d3 from "d3";
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
// https://masteringjs.io/tutorials/vue/vue-d3
const barChartRef = ref<HTMLElement | null>(null);
const margin = reactive({ top: 30, right: 20, bottom: 30, left: 40 });
const height = ref(360);
const width = ref(
  (barChartRef?.value?.offsetWidth || 300) - margin.left - margin.right
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

const data = computed(() => {
  return revenue.value.map((d: Input) => {
    return {
      // label: d3.timeParse("%Y")(d.label)!,
      label: d.label,
      value: d.value,
    };
  });
});

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  handleResize();
  handleDraw();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(
  () => width.value,
  () => {
    remove();
    handleDraw();
  }
);

onMounted(async () => {
  handleDraw();
});

const remove = () => {
  // TODO: Get svg reference
  const svg = d3.select(barChartRef.value).selectAll("svg");

  // check the number of existing elements, if greater than 0; remove all existing ones
  if (svg.size()) svg.remove().exit();
};

const handleResize = () => {
  if (barChartRef?.value?.offsetWidth) {
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
  const svg = d3
    .select(barChartRef.value)
    .append("svg")
    .attr("width", width.value + margin.left + margin.right)
    .attr("height", height.value + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Add X axis
  const x = d3
    .scaleBand()
    .domain(data.value.map((d) => d.label))
    // .domain(data.value, (d) => d.label)
    // .domain([data.value.map((d) => d.label)] as unknown as string)
    .range([0, width.value])
    .padding(0.2);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height.value})`)
    .call(d3.axisBottom(x))
    // .call(d3.axisBottom(x).tickFormat((x) => d3.timeFormat("%Y")(x)))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data.value, (d): number => d.value)] as number[])
    .range([height.value, 0]);

  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data.value)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.label) as number)
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height.value - y(d.value))
    .attr("fill", "#4682b4");

  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width.value / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Company Revenue in USD ($)");
};
</script>

<style scoped>
/* .bar--chart {
  width: 100%;
} */
</style>
