import xhr from '../utils/xhr'

//获取公钥
export function getPublicKey() {
  return xhr({
    url: '/admin/auth/public_key',
    method: 'get'
  })
}

//登录
export function login(data) {
  return xhr({
    url: '/admin/auth/sign_in',
    method: 'post',
    data
  })
}
