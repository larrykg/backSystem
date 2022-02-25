<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"></CategorySelect>
    </el-card>
    <el-card>
      <div>
        <!--展示SPU列表-->
        <el-button icon="el-icon-plus" type="primary">添加SPU</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="info" icon="el-icon-info" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="text-align: center"
                       :current-page="6"
                       :page-sizes="[3,5,7]"
                       :page-size="5"
                       layout="prev,pager,next,jumper,sizes,total"
                       :total="99">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Spu",
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        //控制三级联动的可操作性
        show: true
      }
    },
    methods: {
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
      getSpuList() {
      }
    }
  }
</script>

<style scoped>

</style>
