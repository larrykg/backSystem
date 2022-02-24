<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isTableShow">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="isTableShow=false">添加属性
        </el-button>
        <!--      表格数据-->
        <el-table border="" style="width:100%" :data="attrList">
          <el-table-column type="index" align="center" label="序号" width="80px"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag style="margin: 0 20px" type="success" v-for="(atValue,index) in row.attrValueList"
                      :key="atValue.id">{{atValue.valueName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="min" @click="isTableShow=false"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--      添加|修改属性-->
      <div v-show="!isTableShow">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button @click="isTableShow=true">取消</el-button>

        <el-table border style="width:100%;margin: 20px 0">

          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

          <el-table-column label="属性值名称" width="width" prop="prop"></el-table-column>

          <el-table-column label="操作" width="width" prop="prop"></el-table-column>

        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isTableShow=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Attr",
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        attrList: [],
        //属性值列表的展示
        isTableShow: false
      }
    },
    methods: {
      //子组件传递自定义事件
      getCategoryId({categoryId, level}) {
        if (level == 1) {
          this.category1Id = categoryId;
          this.category2Id = '';
          this.category3Id = '';
        } else if (level == 2) {
          this.category2Id = categoryId;
          this.category3Id = ''
        } else {
          //三级分类的ID有  需要发请求获取平台属性
          this.category3Id = categoryId;
          this.getAttrList()
        }
      },
      async getAttrList() {
        const {category1Id, category2Id, category3Id} = this;
        let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id);
        if (result.code == 200) {
          this.attrList = result.data
        }
      }
    }

  }
</script>

<style scoped>

</style>
