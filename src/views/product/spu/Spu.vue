<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
    </el-card>
    <el-card>
      <!--      三个部分的内容-->
      <div v-show="scene==0">
        <!--展示SPU列表-->
        <el-button icon="el-icon-plus" type="primary" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <HintButton type="success" icon="el-icon-plus" size="mini" title="添加SKU" @click="addSpu"></HintButton>
              <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改SPU"
                          @click="updateSpu(row)"></HintButton>
              <HintButton type="info" icon="el-icon-info" size="mini" title="查看当前SPU全部SKU列表"></HintButton>
              <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除SKU"></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getSpuList"
          @size-change="handlerSizeChange"
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3,5,7]"
          :page-size="limit"
          layout="prev,pager,next,jumper,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <SpuFrom v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuFrom>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
  import SpuFrom from "@/views/product/spu/SpuFrom";
  import SkuForm from "@/views/product/spu/SkuForm";

  export default {
    name: "Spu",
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        //控制三级联动的可操作性
        show: true,
        page: 1,
        limit: 3,
        records: [],//spu数据
        total: 0,
        scene: 0,// 0代表展示SPU数据 1添加修改 2添加SKU
      }
    },
    components: {
      SkuForm,
      SpuFrom
    },
    methods: {
      //点击分页器第几页的回调
      // handlerCurrentChange(page) {
      //   this.page = page;
      //   this.getSpuList()
      // },
      handlerSizeChange(limit) {
        this.limit = limit;
        this.getSpuList()
      },
      //三级联动的自定义事件 可以把子组件的ID传递给父组件
      getCategoryId({categoryId, level}) {
        if (level == 1) {
          this.category1Id = categoryId;
          this.category2Id = '';
          this.category3Id = '';
        } else if (level == 2) {
          this.category2Id = categoryId;
          this.category3Id = ''
        } else {
          this.category3Id = categoryId;
          //获取SPU数据
          this.getSpuList()
        }
      },
      //获取SPU数据
      async getSpuList(pages = 1) {
        this.page = pages
        const {page, limit, category3Id} = this;
        let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
        if (result.code == 200) {
          this.total = result.data.total;
          this.records = result.data.records
        }
      },
      addSpu() {
        this.scene = 1;
      },
      updateSpu(row) {
        this.scene = 1;
        this.$refs.spu.initSpuData(row)
      },
      //自定义事件：
      changeScene(scene) {
        this.scene = scene
      }
    }
  }
</script>

<style scoped>

</style>
