<template>
  <nav
    class="navbar is-dark is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item"
        href="/"
      >
        <span class="has-text-weight-semibold is-family-monospace">KADO</span>
      </a>
      <a
        href="#quick-view-kanban"
        class="navbar-item is-hidden-desktop"
        @click="toggleNewKanban"
      >
        <span class="icon">
          <svg>
            <use href="/svg/feather-sprite.svg#plus-circle" />
          </svg>
        </span>
        <span>NEW KANBAN</span>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleMenu"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <slot name="navbar-end" />
        <a
          href="#quick-view-kanban"
          class="navbar-item"
          @click="toggleNewKanban"
        >
          <span class="icon">
            <svg>
              <use href="/svg/feather-sprite.svg#plus-circle" />
            </svg>
          </span>
          <span>NEW KANBAN</span>
        </a>
        <div
          class="navbar-item is-family-monospace"
          v-text="$store.state.me.name"
        />
      </div>
    </div>

    <div
      ref="menu_mobile"
      class="navbar-menu is-hidden-desktop"
    >
      <div class="navbar-start">
        <router-link
          class="navbar-item"
          :to="{name: 'kanbans.backlog'}"
        >
          <span>Backlog</span>
        </router-link>
        <router-link
          class="navbar-item"
          :to="{name: 'kanbans.develop'}"
        >
          <span>Develop</span>
        </router-link>
        <router-link
          class="navbar-item"
          :to="{name: 'kanbans.feedback'}"
        >
          <span>Feedback</span>
        </router-link>
        <router-link
          class="navbar-item"
          :to="{name: 'kanbans.done'}"
        >
          <span>Done</span>
        </router-link>
      </div>

      <div class="navbar-end">
        <router-link
          class="navbar-item"
          :to="{name: 'stats.index'}"
        >
          Sizes
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import EventBus from '../event_bus';

export default {
  watch: {
    $route(to, from) {
      if (this.$refs.menu_mobile.classList.contains('is-active')) {
        this.toggleMenu();
      }
    },
  },
  methods: {
    toggleMenu() {
      this.$refs.menu_mobile.classList.toggle('is-active');
    },

    toggleNewKanban() {
      EventBus.$emit('kanban-quickview:open', {});
    },
  },
};
</script>
