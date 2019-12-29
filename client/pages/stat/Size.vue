<template>
  <div>
    <div class="columns">
      <div
        v-for="stat in stats"
        :key="stat.id"
        class="column"
      >
        <article class="box is-shadowless">
          <div class="is-flex">
            <p
              class="flex-1 has-text-centered is-size-5"
              v-text="stat.size.label"
            />
            <router-link
              class="button is-small is-text is-rounded has-text-link"
              :to="{ name: 'graphs.size.show', params: { id: stat.size_id } }"
            >
              <span class="icon">
                <svg>
                  <use href="/svg/feather-sprite.svg#pie-chart" />
                </svg>
              </span>
              <span>Graph</span>
            </router-link>
          </div>
          <p class="is-flex">
            <span class="flex-1">
              TOUCH
            </span>
            <span v-text="stat.touch" />
          </p>
          <p class="is-flex">
            <span class="flex-1">
              CIRCLE
            </span>
            <span v-text="stat.circle" />
          </p>
          <p class="is-flex">
            <span class="flex-1">
              LEAD
            </span>
            <span v-text="stat.lead" />
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Xhr from '../../xhr';

export default {
  components: {},

  data() {
    return {
      stats: [],
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const { data } = await Xhr.get('sizes-stats', { params: { eager: 'size' } });
      this.stats = data;
    },
  },
};
</script>
