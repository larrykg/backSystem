//品牌管理的数据
import request from '@/utils/request'

//获取品牌列表 /admin/product/baseTrademark/{page}/{limit}

export const reqTradeMarkList = (page, limit) => {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}
