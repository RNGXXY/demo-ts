import { IRoute } from './typing';
import loadable from '@loadable/component';

const routes: IRoute[] = [
  {
    path: '/',
    component: loadable(() => import('@/layout/BasicLayout')),
    routes: [
      {
        path: '/',
        exact: true,
        name: '首页',
        component: loadable(() => import('@/pages/page1')),
      },
      {
        path: '/page1',
        name: '首页2',
        routes: [
          {
            path: '/page1/page2',
            name: '首页22',
            component: loadable(() => import('@/pages/page2')),
          },
        ],
      },
    ],
  },
];

export default routes;
