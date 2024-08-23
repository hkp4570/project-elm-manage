<script>
import {mapState} from 'vuex';
import {deleteFood, getMenuById, getRestaurantDetail} from '@/api/services';
import {baseUrl, baseImgPath} from '@/utils';

export default {
  data() {
    return {
      offset: 0,
      limit: 10,
      drawerVisible: false,
      selectTable: {},
      selectMenu: {},
      selectIndex: null,
      baseImgPath,
      baseUrl,
      specsFormVisible: false,
      specsFormRules: {
        specs: [
          { required: true, message: '请输入规格', trigger: 'blur' },
        ],
      },
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20,
      },
    };
  },
  created() {
    this.initData();
    this.initFoods();
  },
  computed: {
    ...mapState({
      foodListCount: (state) => state.dataManage.foodListCount,
      foodList: (state) => state.dataManage.foodList,
      menuOptions: (state) => state.dataManage.menuOptions,
    }),
    specs: function () {
      let specs = [];
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach((item) => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price,
          });
        });
      }
      return specs;
    },
  },
  methods: {
    initData() {
      this.$store.dispatch('dataManage/getFoodsCount');
    },
    initFoods() {
      this.$store.dispatch('dataManage/getFoods', {
        offset: this.offset,
        limit: this.limit,
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.initFoods();
    },
    handleCurrentChange(val) {
      this.offset = val - 1;
      this.initFoods();
    },
    handleEdit(index, row) {
      this.drawerVisible = true;
      this.getSelectItemData(row, 'edit');
    },
    async getSelectItemData(row, type) {
      const restaurant = await getRestaurantDetail(row.restaurant_id);
      const category = await getMenuById(row.category_id);
      this.selectTable = {
        ...row,
        ...{
          restaurant_name: restaurant.name,
          restaurant_address: restaurant.address,
          category_name: category.name,
        },
      };
      this.selectMenu = {label: category.name, value: row.category_id};
      if (type === 'edit') {
        this.$store.dispatch('dataManage/getMenu', {
          restaurant_id: row.restaurant_id,
          allMenu: true,
        });
      }
    },
    async handleCloseDrawer(type) {
      if (type === 'ok') {
          const subData = {new_category_id: this.selectMenu.value, specs: this.specs};
          const postData = {...this.selectTable, ...subData};
          const res = await this.$store.dispatch('dataManage/updateFood', postData);
          if(res){
            this.$message({
              type: 'success',
              message: '更新食品信息成功'
            });
            this.initFoods();
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        this.drawerVisible = false;
      } else {
        this.drawerVisible = false;
      }
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    handleServiceAvatarSuccess(res) {
      if (res.status === 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    deleteSpecs(index){
      this.specs.splice(index, 1);
    },
    addspecs(){
      this.specs.push({...this.specsForm});
      this.specsForm.specs = '';
      this.specsForm.packing_fee = 0;
      this.specsForm.price = 20;
      this.specsFormVisible = false;
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row';
      } else if (index === 3) {
        return 'positive-row';
      }
      return '';
    },
    async handleDeleteFood(index, row){
      try{
        const res = await deleteFood(row.item_id);
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '删除食品成功'
          });
          // this.tableData.splice(index, 1);
          this.initFoods();
        }else{
          throw new Error(res.message)
        }
      }catch(e){
        this.$message({
          type: 'error',
          message: e.message
        });
      }
    }
  },
};
</script>

<template>
  <div>
    <div class="table_container">
      <el-table :data="foodList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.restaurant_address }}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.category_name }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="description"></el-table-column>
        <el-table-column label="评分" prop="rating"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="handleDeleteFood(scope.$index, scope.row)"
              :ref="`popover-${scope.$index}`"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference"
              >删除
              </el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>
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
          :total="foodListCount"
        >
        </el-pagination>
      </div>
    </div>
    <el-drawer
      title="修改食品信息"
      size="40%"
      :visible.sync="drawerVisible"
      :before-close="handleCloseDrawer"
    >
      <div class="drawer-content">
        <el-form :model="selectTable">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" label-width="100px">
            <el-select
              v-model="selectIndex"
              :placeholder="selectMenu.label"
              @change="handleSelect"
            >
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/food'"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="selectTable.image_path"
                :src="baseImgPath + selectTable.image_path"
                class="avatar"
                alt=""
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-row style="overflow: auto; text-align: center">
          <el-table
            :data="specs"
            style="margin-bottom: 20px"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="specs" label="规格"></el-table-column>
            <el-table-column prop="packing_fee" label="包装费">
            </el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteSpecs(scope.$index)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="specsFormVisible = true"
            style="margin-bottom: 10px"
          >添加规格
          </el-button>
        </el-row>
        <div class="drawer-footer">
          <el-button @click="handleCloseDrawer('cancel')">取消</el-button>
          <el-button type="primary" @click="handleCloseDrawer('ok')"
          >确定
          </el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog title="添加规格" v-model="specsFormVisible" :visible="specsFormVisible">
      <el-form :rules="specsFormRules" :model="specsForm">
        <el-form-item label="规格" label-width="100px" prop="specs">
          <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" label-width="100px">
          <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input-number v-model="specsForm.price" :min="0" :max="10000"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addspecs">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/index';

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
