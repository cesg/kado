<template>
  <section>
    <div class="columns">
      <div class="column is-8">
        <h4 class="title">
          Working on
        </h4>
        <article
          v-show="fetchDone && !kanbans.length"
          class="has-text-centered"
        >
          <svg class="is--empty">
            <use href="/svg/feather-sprite.svg#coffee" />
          </svg>
          <p class="is-size-5 has-text-weight-semibold is-family-monospace">
            Nothing assigned
          </p>
        </article>
        <div
          v-for="kanban in inDevelop"
          :key="kanban.id"
          class="box is-shadowless"
        >
          <div class="columns is-vcentered">
            <div class="column">
              <router-link
                class="subtitle has-text-link"
                :to="{ name: 'kanbans.edit', params:{ id: kanban.id } }"
                v-text="kanban.name"
              />
            </div>
            <div class="column is-narrow">
              <span
                class="tag is-large is-info"
                v-text="kanban.size.label"
              />
            </div>
          </div>
        </div>

        <section>
          <h4 class="title">
            Waiting
          </h4>
          <div
            v-for="kanban in inFeedback"
            :key="kanban.id"
            class="box is-shadowless"
          >
            <div class="columns is-vcentered">
              <div class="column">
                <router-link
                  class="subtitle has-text-link"
                  :to="{ name: 'kanbans.edit', params:{ id: kanban.id } }"
                  v-text="kanban.name"
                />
              </div>
              <div class="column is-narrow">
                <div class="tags">
                  <span
                    class="tag is-large"
                    v-text="kanban.feedback"
                  />
                  <span
                    class="tag is-large is-info"
                    v-text="kanban.size.label"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="column">
        <h5 class="subtitle">
          <span class="icon">
            <svg>
              <use href="/svg/feather-sprite.svg#alert-triangle" />
            </svg>
          </span>
          <span>Issues</span>
        </h5>
        <ul>
          <li
            v-for="(issue,i) in issues"
            :key="`issue-${i}`"
          >
            <a
              :href="issue.web_url"
              target="_blank"
            >
              <span class="icon">
                <svg>
                  <use href="/svg/feather-sprite.svg#external-link" />
                </svg>
              </span>
              <span v-text="issue.title" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Xhr from '../../xhr';

export default {
  data() {
    return {
      fetchDone: false,
      kanbans: [],
      issues: [],
    };
  },

  computed: {
    inDevelop() {
      return this.kanbans.filter(({ step_id }) => 2 === step_id);
    },

    inFeedback() {
      return this.kanbans.filter(({ step_id }) => 3 === step_id);
    },
  },

  beforeMount() {
    this.fetchKanbans();
    this.fetchIssues();
  },

  methods: {
    async fetchKanbans() {
      await this.$store.dispatch('decodeJwt');
      const { data: develop } = await Xhr.get('kanbans', { params: { eager: '[size]', step_id: [2, 3], assigned_id: this.$store.state.me.id } });
      this.kanbans = develop;
      this.fetchDone = true;
    },

    async fetchIssues() {
      const { data } = await Xhr.get('gitlab/issues');
      this.issues = data;
    },
  },
};
</script>
