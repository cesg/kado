export default [
  {
    path: '/kanbans-backlog',
    name: 'kanbans.backlog',
    component: () => import('../pages/kanban/Backlog'),
  },
  {
    path: '/kanbans-develop',
    name: 'kanbans.develop',
    component: () => import('../pages/kanban/Develop'),
  },
  {
    path: '/kanbans-feedback',
    name: 'kanbans.feedback',
    component: () => import('../pages/kanban/Feedback'),
  },
  {
    path: '/kanbans-done',
    name: 'kanbans.done',
    component: () => import('../pages/kanban/Done'),
  },
  {
    path: '/kanbans/:id',
    name: 'kanbans.edit',
    props: true,
    meta: { show_new: false },
    component: () => import('../pages/kanban/Edit'),
  },
];
