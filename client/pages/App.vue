<template>
  <main class="has-background-white-bis">
    <navbar />
    <component :is="layout">
      <router-view />
    </component>
    <kanban-quickview />
  </main>
</template>
<script>
import Navbar from '../components/Navbar';
import KanbanQuickview from '../components/form/KanbanQuickview';
const SideMenuLayout = () => import('./SideMenuLayout');
const NoMenuLayout = () => import('./NoMenuLayout');

export default {
  components: {
    Navbar,
    KanbanQuickview,
    SideMenuLayout,
    NoMenuLayout,
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'side-menu-layout';
    },
  },
};
</script>
