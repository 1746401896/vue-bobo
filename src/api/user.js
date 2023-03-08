import request from '@/utils/request'



/**
 * 获得用户信息
 */
export function getInfo() {
  return request({
    url: '/v1/user/getInfo',
    method: 'post',
  })
}

/**
 * 修改登录密码
 */
export function updateLoginPwd(data) {
  return request({
    url: '/v1/user/updateLoginPwd',
    method: 'post',
    data
  })
}
/**
 * 修改安全密码
 */
export function updateSafePwd(data) {
  return request({
    url: '/v1/user/updateSafePwd',
    method: 'post',
    data
  })
}



