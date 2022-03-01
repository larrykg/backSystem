<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称"></el-input>
      </el-form-item>

      <el-form-item label="名牌">
        <el-select placeholder="品牌" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="描述"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select placeholder="还有3未选择" value="">
          <el-option label="label" value=""></el-option>
        </el-select>
        <el-button icon="el-icon-plus" type="primary">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="prop" label="属性名" width="width"></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width"></el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SpuFrom",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        //spu信息
        spu: {},
        //品牌信息
        tradeMarkList: [],
        spuImages: [],
        saleAttrList: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //初始化SPU数据
      async initSpuData(row) {
        //获取SPU信息的数据
        let spuResult = await this.$API.spu.reqSpuInfo(row.id);
        if (spuResult.code == 200) {
          this.spu = spuResult.data
        }
        //获取品牌信息
        let tradeMarkResult = await this.$API.spu.reqTrademarkList();
        if (tradeMarkResult.code == 200) {
          this.tradeMarkList = tradeMarkResult.data
        }
        //获取SpU图片
        let spuImageListResult = await this.$API.spu.reqSpuImageList(row.id);
        if (spuImageListResult.code == 200) {
          this.spuImages = spuImageListResult.data
        }
        //获取平台全部销售属性
        let saleResult = await this.$API.spu.reqBaseSaleAttrList();
        if (saleResult.code == 200) {
          this.saleAttrList = saleResult.data
        }
      }
    }
  }
</script>

<style scoped>

</style>
