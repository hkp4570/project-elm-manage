<script>
import {getUserCount} from '@/api/user';

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      total: 0,
      queryParams:{
        offset: 0,
        limit: 10,
      }
    }
  },
  created() {
    this.initData();
  },
  methods: {
    userList(){
      this.$store.dispatch('user/getUserList', this.queryParams).then(resp => {
        this.tableData = resp;
      });
    },
    initData() {
      this.userList();
      getUserCount().then(resp => {
        if(resp.status === 1){
          this.total = resp.count;
        }else{
          this.$message.error('获取用户数量失败');
        }
      })
    },
    handleCurrentChange(val){
      this.queryParams.offset = val - 1;
      this.userList();
    },
    handleSizeChange(val){
      this.queryParams.limit = val;
      this.userList();
    }
  }
}
</script>

<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="registe_time"
        label="注册日期"
        width="280">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户姓名"
        width="280">
      </el-table-column>
      <el-table-column
        prop="city"
        label="注册地址">
      </el-table-column>
    </el-table>
    <div class="block">
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.offset + 1"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import "@/styles/index";
</style>
