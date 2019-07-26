import routes from './../routes/routes'
import renderRoutes from './../routes/renderRoutes'

const get_children = Symbol('get_children')

class GetRouteClass {
  /**
   * 获取相应等级下的children
   * @param {Array} routerArr 路由配置
   * @param {Nunber} children_class children的等级
   */

  [get_children](routerArr, children_class) {
    // 若输入的children等级<=1 或 未输入, 默认为2, 并提示
    if (children_class <= 1 || children_class === null) {
      children_class = 2
      console.warn(
        'getChildren(path, children_class)该方法的children_class >= 2'
      )
    }

    let childrenArr = [] // 设置全局children数组

    childrenArr = routerArr.filter(item => {
      return Object.keys(item).indexOf('children') > -1
    })

    // 当等级<=2时, 直接返回
    if (children_class === 2) return childrenArr

    for (let i = 2; i < children_class; i++) {
      // 循环遍历children并筛选出含有children字段的路由
      childrenArr = childrenArr.map(item => {
        return item.children.filter(element => {
          return Object.keys(element).indexOf('children') > -1
        })
      })
      // 去除数组中的空数组
      childrenArr = childrenArr.filter(item => {
        return item.length > 0
      })
      // 去除数组中的数组 [ [ {} ] ] ==> [ {} ]
      childrenArr = childrenArr.map(item => {
        return item[0]
      })
    }
    return childrenArr
  }

  /**
   * 获取第n层级的children路由
   * @param {String} path 父级路由
   * @param {Number} children_class 需要获取的路由的等级
   */
  getChildren(path, children_class) {
    const authed = sessionStorage.getItem('token') ? true : false
    const childrenArr = this[get_children](routes, children_class) // 获取所有的二级children
    const child = childrenArr.filter(item => {
      // 筛选出指定的二级child
      return item.path === path
    })
    return renderRoutes(child[0].children, authed)
  }
}

export default GetRouteClass
