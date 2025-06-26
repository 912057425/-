import xhr from '../utils/xhr'

//获取菜单列表(分类)
export function getMenuList() {
  return xhr({
    url: '/admin/categories',
    method: 'get'
  })
}

//获取单个分类下的课程
export function getCategoryCourses(id) {
  return xhr({
    url: `/admin/courses`,
    method: 'get',
    params: {
      categoryId: id
    }
  })
}
