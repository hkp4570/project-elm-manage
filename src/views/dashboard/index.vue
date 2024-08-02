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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
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
    }
  },
  mounted() {
    this.initData();
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
