<template>
  <quickview
    :open="isOpen"
    @open="isOpen = $event"
  >
    <template v-slot:quickview-title>
      <div class="is-flex">
        <span class="flex-1">
          KANBAN
        </span>
        <router-link
          v-if="kanban.id"
          :to="{ name: 'kanbans.edit', params: { id: kanban.id } }"
          class="button is-small is-white has-text-link"
          style="margin-left: 0.2rem"
        >
          <span class="icon">
            <svg>
              <use href="/svg/feather-sprite.svg#maximize-2" />
            </svg>
          </span>
        </router-link>
      </div>
    </template>
    <template v-slot:quickview-block>
      <kanban-form
        style="padding: 0.75rem;"
        :kanban="kanban"
        @form-submit="done"
      />
    </template>
    <template v-slot:quickview-footer>
      <button
        ref="submit"
        form="form_kanban"
        type="submit"
        class="button is-rounded is-outlined is-link is-fullwidth"
      >
        <span class="icon">
          <svg>
            <use href="/svg/feather-sprite.svg#save" />
          </svg>
        </span>
        <span>Save</span>
      </button>
    </template>
  </quickview>
</template>

<script>
import Quickview from '../Quickview';
import EventBus from '../../event_bus';
import KanbanForm from './KanbanForm';

export default {
  inject: ['notyf'],
  components: {
    Quickview,
    KanbanForm,
  },

  data() {
    return {
      isOpen: this.open,
      kanban: {},
    };
  },

  watch: {
    $route(to, from) {
      this.isOpen = false;
    },
  },

  beforeMount() {
    EventBus.$on('kanban-quickview:open', kanban => {
      this.kanban = kanban;
      this.isOpen = true;
    });
  },

  methods: {
    done() {
      this.isOpen = false;
      this.$nextTick(() => {
        window.location.reload();
      });
    },
  },
};
</script>
