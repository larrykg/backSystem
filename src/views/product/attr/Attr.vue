<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isTableShow">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性
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
              <el-button type="warning" icon="el-icon-edit" size="min" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--      添加|修改属性-->
      <div v-show="!isTableShow">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性值" v-model="attrInfo.attrName">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
        </el-button>
        <el-button @click="isTableShow=true">取消</el-button>

        <el-table border style="width:100%;margin: 20px 0" :data="attrInfo.attrValueList">

          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

          <el-table-column label="属性值名称" width="width" prop="prop">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.valueName"
                        placeholder="请输入属性值名称"
                        size="mini" v-if="row.flag"
                        @blur="toLook(row)"
                        @keyup.native.enter="toLook(row)"
                        :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block">{{row.valueName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="width" prop="prop">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isTableShow=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  //引入lodash当中的深拷贝
  import cloneDeep from 'lodash/cloneDeep';

  export default {
    name: "Attr",
    data() {
      return {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        attrList: [],
        //属性值列表的展示
        isTableShow: true,
        //收集新增属性|修改属性
        attrInfo: {
          "attrName": "",
          "attrValueList": [],
          "categoryId": 0,
          "categoryLevel": 3
        }
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
      },
      //添加属性值
      addAttrValue() {
        this.attrInfo.attrValueList.push({
          attrId: this.attrInfo.id,
          valueName: "",
          //切换编辑模式|查看模式
          flag: true
        });
        this.$nextTick(() => {
          this.$refs[this.attrInfo.attrValueList.length - 1].focus()
        })
      },
      //添加属性按钮的回调
      addAttr() {
        //切换table的隐藏
        this.isTableShow = false;
        //清除已写入的model数据
        this.attrInfo = {
          attrName: '',
          attrValueList: [],
          categoryId: this.category3Id,
          categoryLevel: 3
        }
      },
      //修改某一个属性值
      updateAttr(row) {
        this.isTableShow = false;
        //由于数据结构是对象>数组>对象
        this.attrInfo = cloneDeep(row);
        //在修改某属性的时候 将相应的元素添加flag标记
        this.attrInfo.attrValueList.forEach(item => {
          //VUE 无法探测普通的新增的属性: item.flag = false
          this.$set(item, 'flag', false)
        })
      },
      //失去焦点事件 切换为查看模式
      toLook(row) {
        if (row.valueName.trim() == '') {
          this.$message('请输入正常属性值');
          return
        }
        let isRepat = this.attrInfo.attrValueList.some(item => {
          if (row != item) {
            return row.valueName == item.valueName
          }
        });
        if (isRepat) return;
        row.flag = false
      },
      //点击SPAN的事件
      toEdit(row, index) {
        row.flag = true;
        //获取input节点  实现聚焦  点击span时切换input ，对于浏览器页面重绘需要耗时间，需要$nextTick 节点渲染完毕了执行一次
        this.$nextTick(() => {
          this.$refs[index].focus()
        })
      }
    }

  }
</script>

<style scoped>

</style>
