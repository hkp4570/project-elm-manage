<template>
  <div class="dashboard-container">
    <h1 style="text-align: center">数据统计</h1>
    <el-row style="margin-bottom: 20px">
      <el-button class="btn" type="primary">当日数据</el-button>
      <el-button class="btn">
        <span class="btn-num">{{userCount}}</span>
        <span class="btn-text">新增用户</span>
      </el-button>
      <el-button class="btn">
        <span class="btn-num">{{orderCount}}</span>
        <span class="btn-text">新增订单</span>
      </el-button>
      <el-button class="btn">
        <span class="btn-num">{{adminCount}}</span>
        <span class="btn-text">新增管理员</span>
      </el-button>
    </el-row>
    <el-row>
      <el-button class="btn" type="success">总数据</el-button>
      <el-button class="btn">
        <span class="btn-num">{{allUserCount}}</span>
        <span class="btn-text">注册用户</span>
      </el-button>
      <el-button class="btn">
        <span class="btn-num">{{allOrderCount}}</span>
        <span class="btn-text">订单</span>
      </el-button>
      <el-button class="btn">
        <span class="btn-num">{{allAdminCount}}</span>
        <span class="btn-text">管理员</span>
      </el-button>
    </el-row>
    <Tendency :sevenData="sevenData" :sevenDay="sevenDay"></Tendency>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tendency from '@/components/tendency.vue';
import moment from "moment/moment";
import { userCount, orderCount, adminDayCount } from '@/api/dashboard';

export default {
  name: 'Dashboard',
  components:{
    Tendency
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenData:[[],[],[]],
    }
  },
  mounted() {
    this.initData();
    for (let i = 6; i > -1 ; i--) {
      const date = moment(new Date().getTime() - 86400000*i).format('YYYY-MM-DD');
      this.sevenDay.push(date);
    }
    this.getSevenData();
  },
  methods:{
    initData(){
      this.$store.dispatch('dashboard/allCount').then(response => {
        this.userCount = response[0].count;
        this.orderCount = response[1].count;
        this.adminCount = response[2].count;
        this.allUserCount = response[3].count;
        this.allOrderCount = response[4].count;
        this.allAdminCount = response[5].count;
      })
    },
    getSevenData(){
      const apiArr = [[],[],[]];
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      })
      const promiseArr = [...apiArr[0],...apiArr[1],...apiArr[2]];
      Promise.all(promiseArr).then(res => {
        const resArr = [[],[],[]];
        res.forEach((item,index) => {
          if(item.status === 1){
            resArr[Math.floor(index/7)].push(item.count);
          }
        })
        this.sevenData = resArr;
      }).catch(e => {
        console.log(e);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  .btn{
    width: 200px;
    height: 42px;
    padding: 0;
    line-height: 42px;
    cursor: default;
  }
  .btn-num{
    font-size: 20px;
  }
  .btn-text{
    font-size: 12px;
  }
}
</style>
