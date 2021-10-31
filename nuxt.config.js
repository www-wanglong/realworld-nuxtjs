/**
 * Nuxt.js配置文件
 */

module.exports = {
  router: {
    // 自定义路由表
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js基于 pages目录默认生成的理由规则
      routes.splice(0)
      console.log(routes)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home/'),
            }
          ]
        },
      ])
    }
  }
}