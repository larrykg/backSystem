import request from '@/utils/request'

//GET /admin/product/{page}/{limit} 获取SPU数据
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
  })
}

// 获取SPU信息  GET /admin/product/getSpuById/{spuId}
export const reqSpuInfo = (spuId) => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

//获取品牌的信息 GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => {
  return request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
}

//SPU图片  GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

//获取平台全部销售属性 3个 GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => {
  return request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
}
