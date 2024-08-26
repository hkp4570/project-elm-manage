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
        color: ['#5793f3', '#675bba', '#d14a61'],
        title: {
          text: '走势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: {readOnly: false},
        //     magicType: {type: ['bar', 'line']},
        //     restore: {},
        //   }
        // },
        xAxis: {
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: [
          {
            type: 'value',
            name: '用户',
            min: 0,
            max: 200,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '订单',
            min: 0,
            max: 200,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
        ],
        series: [
          {
            name: '新注册用户',
            type: 'line',
            data: this.sevenData[0],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          },
          {
            name: '新增订单',
            type: 'line',
            data: this.sevenData[1],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          },
          {
            name: '新增管理员',
            type: 'line',
            data: this.sevenData[2],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          }
        ]
      }
      this.myChart.setOption(options);
    }
  }
}
</script>

<template>
  <div id="chart" style="width: 90%; height:450px;"></div>
</template>

<style scoped lang="scss">

</style>
