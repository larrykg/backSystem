import request from '@/utils/request'

//GET /admin/product/{page}/{limit} 获取SPU数据
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
  })
}
