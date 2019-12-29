<template>
  <section class="section">
    <div class="container is-fullhd">
      <div class="columns">
        <div class="is-hidden-mobile column is-2">
          <div class="box is-shadowless">
            <aside-menu />
          </div>
        </div>
        <div class="column">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AsideMenu from '../components/Menu';
export default {
  components: {
    AsideMenu,
  },

  computed: {
    showButton() {
      return this.$route.meta.hasOwnProperty('show_new') ? this.$route.meta.show_new : true;
    },
  },
};
</script>
