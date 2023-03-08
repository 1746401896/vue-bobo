import request from '@/utils/request'



/**
 * 用户登录
 */
export function user(data) {
  return request({
    url: '/v1/login/user',
    method: 'post',
    data
  })
}

/**
 * 用户注册
 */
export function register(data) {
  return request({
    url: '/v1/login/register',
    method: 'post',
    data
  })
}
