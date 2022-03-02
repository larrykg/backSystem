<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="名牌">
        <el-select placeholder="品牌" value="" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImages"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
          <el-option :label="un.name" :value="un.id" v-for="(un,index) in unSelectSaleAttr" :key="un.id"></el-option>
        </el-select>
        <el-button icon="el-icon-plus" type="primary" :disabled="!attrId">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <!--        @close="handleClose(tag)"-->
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable
                      :disable-transitions="false">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!--              @keyup.enter.native="handleInputConfirm"-->
              <!--              @blur="handleInputConfirm"-->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                        ref="saveTagInput" size="small">
              </el-input>
              <!--              @click="showInput"-->
              <el-button v-else class="button-new-tag" size="small">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
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
        spu: {
          "category3Id": 0,
          "description": "string",
          "spuName": "string",
          "tmId": 0,
          "spuImageList": [
            // {
            //   "id": 0,
            //   "imgName": "string",
            //   "imgUrl": "string",
            //   "spuId": 0
            // }
          ],
          //平台属性与属性值
          "spuSaleAttrList": [
            // {
            //   "baseSaleAttrId": 0,
            //   "id": 0,
            //   "saleAttrName": "string",
            //   "spuId": 0,
            //   "spuSaleAttrValueList": [
            //     {
            //       "baseSaleAttrId": 0,
            //       "id": 0,
            //       "isChecked": "string",
            //       "saleAttrName": "string",
            //       "saleAttrValueName": "string",
            //       "spuId": 0
            //     }
            //   ]
            // }
          ],
        },
        //品牌信息
        tradeMarkList: [],
        spuImages: [],
        saleAttrList: [],
        //收集未选择的销售属性ID
        attrId: ''
      };
    },
    computed: {
      //还未选择的销售属性
      unSelectSaleAttr() {
        let result = this.saleAttrList.filter(item => {
          return this.spu.spuSaleAttrList.every(item1 => {
            return item.name != item1.saleAttrName
          })
        });
        return result
      }

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
          let listArr = spuImageListResult.data;
          //由于照片墙需要数组 name,url字段
          listArr.forEach(item => {
            item.name = item.imgName;
            item.url = item.imgUrl
          });
          this.spuImages = listArr
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

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
