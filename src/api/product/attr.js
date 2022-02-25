//平台属性管理
import request from '@/utils/request'

//获取一级分类数据 GET GET /admin/product/getCategory1
export const reqCategory1List = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}


//获取二级分类数据 /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

//获取三级分类数据 /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

//获取平台属性 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => {
  return request({
      url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
      method: 'get'
    }
  )
}
//添加属性与属性值  POST /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => {
  return request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
  })
}
// {
//   "attrName": "string",
//   "attrValueList": [
//   {
//     "attrId": 0,
//     "id": 0,
//     "valueName": "string"
//   }
// ],
//   "categoryId": 0, category3Id
//   "categoryLevel": 0, 3
//   "id": 0
// }
