<template>
  <button
    id="btn-nuevo"
    class="button is-link is-medium"
    @click="openQuickview"
  >
    <span class="icon">
      <svg>
        <use xlink:href="/svg/feather-sprite.svg#plus" />
      </svg>
    </span>
  </button>
</template>

<script>
import EventBus from '../event_bus';

export default {
  methods: {
    openQuickview() {
      EventBus.$emit('kanban-quickview:open', {});
    },
  },
};
</script>

<style scoped>
#btn-nuevo {
  position: absolute;
  bottom: 2rem;
  right: 1.5rem;
}
</style>
