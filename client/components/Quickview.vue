<template>
  <div
    :class="{'is-active': open}"
    class="quickview"
  >
    <header class="quickview-header">
      <p class="title">
        <slot name="quickview-title" />
      </p>
      <span
        class="delete"
        data-dismiss="quickview"
        @click="$emit('open', false)"
      />
    </header>

    <div class="quickview-body">
      <div class="quickview-block">
        <slot name="quickview-block" />
      </div>
    </div>

    <footer class="quickview-footer">
      <slot name="quickview-footer" />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
