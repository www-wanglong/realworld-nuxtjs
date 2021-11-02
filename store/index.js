const cookieparser = process.server ? require('cookieparser') : undefined

// 服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  };
};

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxt特殊的action方法，会在服务端渲染期间自动调用
  // 初始化容器数据，传递数据给客户端
  nuxtServerInit ({ commit }, { req }) {
    console.log('nuxtServerInit')
    let user = null
    if (req.headers.cookie) {
      // 使用 cookieparser把cookie转为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}