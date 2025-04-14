import xhr from '../utils/xhr'

export function login(data) {
  return xhr({
    url: '/admin/auth/sign_in',
    method: 'post',
    data
  })
}
