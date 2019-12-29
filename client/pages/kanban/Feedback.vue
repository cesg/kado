<template>
  <section>
    <article
      v-show="fetchDone && !kanbans.length"
      class="has-text-centered field"
    >
      <svg class="is--empty">
        <use href="/svg/feather-sprite.svg#meh" />
      </svg>
      <p class="is-size-5 has-text-weight-semibold is-family-monospace">
        Nada para ver acá
      </p>
    </article>
    <div class="list">
      <div
        v-for="kanban in kanbans"
        :key="kanban.id"
        class="list-item is-flex"
      >
        <router-link
          class="flex-1"
          :to="{ name: 'kanbans.edit', params: { id: kanban.id } }"
          title="Edit"
          v-text="kanban.name"
        />
        <p style="margin: 0 0.5rem">
          <span
            class="tag is-info"
            v-text="kanban.size.label"
          />
        </p>
        <div class="buttons">
          <button
            v-if="kanban.assigned"
            class="button is-small is-white"
            :title="kanban.assigned.name"
          >
            <span class="icon">
              <svg>
                <use href="/svg/feather-sprite.svg#user" />
              </svg>
            </span>
          </button>
          <button
            class="button is-small"
            title="Quick view"
            @click="view(kanban)"
          >
            <span class="icon">
              <svg>
                <use href="/svg/feather-sprite.svg#arrow-up-right" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Xhr from '../../xhr';
import EventBus from '../../event_bus';

export default {
  components: {},

  data() {
    return {
      fetchDone: false,
      kanbans: [],
    };
  },

  beforeMount() {
    this.fetchKanbans();
  },

  methods: {
    async fetchKanbans() {
      const { data } = await Xhr.get('kanbans', { params: { step_id: 3, eager: '[size,assigned]' } });
      this.kanbans = data;
      this.fetchDone = true;
    },

    view(kanban) {
      EventBus.$emit('kanban-quickview:open', kanban);
    },
  },
};
</script>
