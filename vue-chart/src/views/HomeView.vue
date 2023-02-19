<template>
  <main class="charts">
    <div class="chart--title">
      <h1>Graphs in Vue.js</h1>
    </div>
    <div class="chart--items">
      <div class="chart--item">
        <LineChart></LineChart>
      </div>
      <div class="chart--item">
        <BarChart></BarChart>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BarChart from "../components/BarChart/BarChart.vue";
import LineChart from "../components/LineChart/LineChart.vue";
</script>

<style scoped>
.charts {
  padding: 10px;
}
.chart--title {
  text-align: center;
  padding: 2rem 0rem;
}
.chart--items {
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.chart--item {
  /* border-radius: 10px; */
  text-align: left;
  width: 100%;
  padding: 10px;
  padding: 0.5rem;
  margin-top: 16px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@media (min-width: 1040px) {
  .chart--items {
    display: flex;
    flex-direction: row;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
