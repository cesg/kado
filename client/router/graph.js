export default [
  {
    path: '/graph/size/:id',
    name: 'graphs.size.show',
    component: () => import('../pages/graph/Size'),
    props: true,
  },
];
