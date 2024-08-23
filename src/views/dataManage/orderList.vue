<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      offset: 0,
      limit: 10,
      expendRow: []
    }
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState({
      orderList: state => state.dataManage.orderList,
      orderListCount: state => state.dataManage.orderListCount,
    })
  },
  methods: {
    initData() {
      this.$store.dispatch('dataManage/getOrderList', {offset: this.offset, limit: this.limit})
    },
    handleSizeChange(val) {
      this.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.offset = val - 1;
      this.initData();
    },
    async expand(row, status) {
      if (status.length) {
        this.$store.dispatch('dataManage/getOrderDetail', {
          restaurant_id: row.restaurant_id,
          user_id: row.user_id,
          address_id: row.address_id,
          index: row.index,
        })
      }
    }
  }
}
</script>

<template>
  <div class="table_container">
    <el-table
      :data="orderList"
      @expand-change='expand'
      :expand-row-keys='expendRow'
      :row-key="row => row.index"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_amount">
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="status">
      </el-table-column>
    </el-table>
    <div class="block">
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderListCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/index';
.table_container{
  padding: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
