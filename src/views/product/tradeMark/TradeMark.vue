<template>
  <div>
    <el-button type="primary"
               icon="el-icon-plus"
               style="margin: 10px 0px"
               @click="showDailog"
    >添加
    </el-button>
    <!--    data:数据 border边框  label 标题-- width 宽度> -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="limit" @click="updateTradeMark">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="limit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3,5,10]"
      @current-change="getPageList"
      @size-change='handleSizeChange'
      layout="prev,pager,next,jumper,->,sizes,total"
    >
    </el-pagination>

    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!--          这里收集数据不能使用v-model因为不是表单元素-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TradeMark",
    data() {
      return {
        page: 1,
        limit: 3,
        total: 0,
        list: [],
        dialogFormVisible: false,
        //上传图片
        imageUrl: '',
        //收集品牌信息
        tmForm: {
          tmName: '',
          logoUrl: ''
        }
      }
    },
    mounted() {
      this.getPageList()
    },
    methods: {
      async getPageList(pager = 1) {
        this.page = pager
        const {page, limit} = this
        //获取品牌列表的接口
        let result = await this.$API.trademark.reqTradeMarkList(page, limit);
        console.log(result);
        if (result.code == 200) {
          this.total = result.data.total;
          this.list = result.data.records
        }
      },
      //展示数据的条数发生变化的时候触发
      handleSizeChange(limit) {
        this.limit = limit;
        this.getPageList()
      },
      //显示对话框
      showDailog() {
        this.tmForm = {
          tmName: '',
          logoUrl: ''
        }
        this.dialogFormVisible = true
      },
      //修改
      updateTradeMark() {
        this.dialogFormVisible = true
      },
      //图片上传成功
      handleAvatarSuccess(res, file) {

        this.tmForm.logoUrl = res.data;
      },
      //图片上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //添加按钮 添加或修修改
      async addOrUpdateTradeMark() {
        this.dialogFormVisible = false;
        let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
        if (result.code == 200) {
          //弹出信息
          this.$message(this.tmForm.id ? '修改品牌成功' : '添加品牌成功');
          this.getPageList()
        }
      }
    }

  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
