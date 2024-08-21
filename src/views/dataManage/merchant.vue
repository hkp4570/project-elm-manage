<script>
export default {
  data(){
    return {
      tableData:[],
    }
  },
  created() {
    this.initData();
  },
  methods:{
    initData(){
      this.$store.dispatch('dataManage/getCity');
    }
  }
}

</script>

<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="店铺名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="店铺地址"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="店铺介绍"
      prop="id">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">添加食品</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>
