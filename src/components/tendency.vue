<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      myChart: null,
    }
  },
  props: ['sevenData', 'sevenDay'],
  mounted() {
    this.myChart = echarts.init(document.getElementById('chart'));
    this.initChartData();
  },
  methods: {
    initChartData() {
      const options = {
        title: {
          text: '走势图'
        }
      }
      this.myChart.setOption(options);
    }
  }
}
</script>

<template>
  <div id="chart" style="width: 90%;height:450px;"></div>
</template>

<style scoped lang="scss">

</style>
