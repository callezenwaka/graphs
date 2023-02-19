<template>
  <main>
    <div class="charts">
      <div class="chart--item">
        <LineChart></LineChart>
      </div>
      <div></div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import TheWelcome from "../components/TheWelcome.vue";
import LineChart from "../components/LineChart/LineChart.vue";
</script>

<style scoped>
.charts {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.chart--item {
  /* border-radius: 10px; */
  text-align: left;
  width: 100%;
  padding: 10px;
  padding: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
