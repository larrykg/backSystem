<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>
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
          <el-button type="warning" icon="el-icon-edit" size="limit">修改</el-button>
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
        list: []
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
      handleSizeChange(limit){
        this.limit = limit;
        this.getPageList()
      }
    }

  }
</script>

<style scoped>

</style>
