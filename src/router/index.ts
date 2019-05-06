import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Home from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false,
      },
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 关闭搜索面板
  // store.commit('d2admin/search/set', false);
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      });
      // https://github.com/d2-projects/d2-admin/issues/138
      NProgress.done();
  } else {
    // 不需要身份校验 直接通过
    next();
  }
});

router.afterEach(() => {
  // 进度条
  NProgress.done();
});

export default router;
