<script>
import * as echarts from 'echarts';
import {getUserCity} from '@/api/services';

export default {
  data() {
    return {
      myChart: null,
      pieData: {},
    }
  },
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const response = await getUserCity();
    if (response.status === 1) {
      this.myChart = echarts.init(document.getElementById('visitorCharts'));
      this.pieData = response.user_city;
      this.initData();
    }else{
      this.$message.error(response.message);
    }
    loading.close();
  },
  methods:{
    initData(){
      const option = {
        title : {
          text: '用户分布',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京','上海','深圳','杭州','其他']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:this.pieData.beijing, name:'北京'},
              {value:this.pieData.shanghai, name:'上海'},
              {value:this.pieData.shenzhen, name:'深圳'},
              {value:this.pieData.hangzhou, name:'杭州'},
              {value:this.pieData.qita, name:'其他'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.myChart.setOption(option);
    }
  }
}

</script>

<template>
  <div id="visitorCharts" ></div>
</template>

<style scoped lang="scss">
#visitorCharts {
  width: 90%;
  height: 450px;
}
</style>
