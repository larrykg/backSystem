//品牌管理的数据
import request from '@/utils/request'

//获取品牌列表 /admin/product/baseTrademark/{page}/{limit}

export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

//处理添加品牌 新增 /admin/product/baseTrademark/save 参数   "logoUrl": "string", "tmName": "string"  post
//处理添加品牌 修改 /admin/product/baseTrademark/update 参数   id: "logoUrl": "string", "tmName": "string"  put

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }

}

//删除 /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}

