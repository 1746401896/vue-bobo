import request from '@/utils/request'



/**
 * 获得用户信息
 *
 */
export function getConfig() {
  return request({
    url: '/v1/config',
    method: 'get',
  })
}



