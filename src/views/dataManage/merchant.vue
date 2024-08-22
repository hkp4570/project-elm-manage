<script>
import {mapState} from 'vuex';
import {searchPlace} from "@/api/services";

export default {
  data() {
    return {
      offset: 0,
      limit: 10,
      dialogVisible: false,
      selectTable: {},
      addressList: null,
      selectedCategory: [],
      selectAddress: {},
    }
  },
  created() {
    this.initData();
  },
  computed: {
    ...mapState({
      restaurantCount: state => state.dataManage.restaurantCount,
      restaurantList: state => state.dataManage.restaurantList,
      city: state => state.dataManage.city,
      categoryOptions: state => state.dataManage.categoryOptions,
    }),
  },
  methods: {
    initData() {
      this.$store.dispatch('dataManage/getRestaurantCount');
      this.$store.dispatch('dataManage/getRestaurantList', {offset: this.offset, limit: this.limit});
    },
    // 获取店铺分类
    getCategory() {
      this.$store.dispatch('dataManage/getFoodCategory');
    },
    handleCurrentChange(val) {
      this.offset = val - 1;
      this.initData();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.initData();
    },
    handleEdit(index, row) {
      this.selectTable = row;
      this.dialogVisible = true;
      this.selectedCategory = row.category.split('/');
      if (!this.categoryOptions.length) {
        this.getCategory();
      }
    },
    async handleDelete(index,row){
      const result = await this.$store.dispatch('dataManage/deleteRestaurant',row.id);
      if(result.status === 1){
        this.$message.success(result.message);
      }else{
        this.$message.error(result.message);
      }
    },
    addressSelect(addr) {
      const {latitude, longitude, address} = addr;
      this.selectAddress = {latitude, longitude, address, location:[longitude,latitude]};
    },
    async querySearchAsync(queryString, cb) {
      if (queryString && !this.addressList) {
        try {
          const cityList = await searchPlace(this.city.id, queryString);
          if (Array.isArray(cityList)) {
            const _cityList = cityList.map(item => {
              item.value = item.address;
              return item;
            })
            this.addressList = cityList;
            cb(_cityList);
          }
        } catch (e) {
          console.log(e);
        }
      }
      if (this.addressList) {
        cb(this.addressList);
      }
    },
    beforeAvatarUpload(file) {
      if (file.type !== 'image/jpeg' || file.type !== 'image/png') {
        this.$message.error('请上传jpg/png格式的图片');
        return false;
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('图片大小不能超过2M');
        return false;
      }
      return true;
    },
    handleServiceAvatarSuccess(res) {
      if (+res.status === 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    async updateShop() {
      Object.assign(this.selectTable,this.selectAddress);
      this.selectTable.category = this.selectedCategory.join('/');
      const message = await this.$store.dispatch('dataManage/updateRestaurant',this.selectTable);
      this.$message.info(message);
    }
  }
}

</script>

<template>
  <div class="table_container">
    <el-table
      :data="restaurantList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.recent_order_num }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
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
        prop="address">
      </el-table-column>
      <el-table-column
        label="店铺介绍"
        prop="description">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">添加食品
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
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
          :total="restaurantCount">
        </el-pagination>
      </div>
    </div>
    <!--    dialog  -->
    <el-dialog
      title="修改店铺信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="selectTable">
        <el-form-item label="店铺名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-autocomplete
            v-model="selectTable.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            style="width: 100%;"
            @select="addressSelect"
          ></el-autocomplete>
          <span>当前城市：{{ city.name }}</span>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="selectTable.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px">
          <el-cascader
            :options="categoryOptions"
            v-model="selectedCategory"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="店铺图片" label-width="100px">
          <el-upload
            accept=".jpeg,.jpg,.png"
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/shop"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleServiceAvatarSuccess"
          >
            <img v-if="selectTable.image_path" :src="'https://elm.cangdu.org/img/' + selectTable.image_path"
                 class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateShop">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/index";

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

.table_container {
  padding: 20px;
}

.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
