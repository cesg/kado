<template>
  <section>
    <div class="field">
      <router-link
        :to="{ name: 'stats.index' }"
        class="is-flex"
      >
        <span class="icon">
          <svg>
            <use href="/svg/feather-sprite.svg#arrow-left-circle" />
          </svg>
        </span>
        <span>Back</span>
      </router-link>
    </div>
    <article class="box is-shadowless">
      <p class="subtitle has-text-centered">
        Lead & circle
      </p>
      <div
        id="chart_lead_circle"
      />
    </article>
    <article class="box is-shadowless">
      <p class="subtitle has-text-centered">
        Touch
      </p>
      <div id="chart_touch" />
    </article>
  </section>
</template>

<script>
import xhr from '../../xhr';
import 'c3/c3.css';

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      kanbans: [],
    };
  },

  mounted() {
    this.fetchKanbans().then(() => {
      import('c3').then(c3 => {
        this.$options.chart = c3.generate({
          bindto: '#chart_lead_circle',
          data: {
            x: 'x',
            columns: [
              ['x'].concat(this.kanbans.map(({ id }) => `#${id}`)),
              ['lead'].concat(this.kanbans.map(({ lead }) => lead)),
              ['circle'].concat(this.kanbans.map(({ circle }) => circle)),
            ],
          },
          axis: {
            x: {
              type: 'category',
              categories: this.kanbans.map(({ id }) => `#${id}`),
            },
          },
        });
        this.$options.chartTouch = c3.generate({
          bindto: '#chart_touch',
          data: {
            x: 'x',
            columns: [['x'].concat(this.kanbans.map(({ id }) => `#${id}`)), ['touch'].concat(this.kanbans.map(({ touch }) => touch))],
          },
          axis: {
            x: {
              type: 'category',
              categories: this.kanbans.map(({ id }) => `#${id}`),
            },
          },
        });
      });
    });
  },

  methods: {
    async fetchKanbans() {
      const { data } = await xhr.get('/kanbans', { params: { size_id: this.id, step_id: 4 } });
      this.kanbans = data;
    },
  },
};
</script>
