<template>
  <div class="columns">
    <div class="column is-2 is-offset-5 box is-shadowless">
      <p class="subtitle field has-text-centered has-text-weight-semibold">
        Login options
      </p>

      <form
        action="/api/auth/gitlab"
        method="GET"
        class="field"
      >
        <div class="field">
          <div class="control">
            <button class="button is-success is-rounded is-fullwidth">
              <span class="icon">
                <svg>
                  <use href="/svg/feather-sprite.svg#gitlab" />
                </svg>
              </span>
              <span>Use Gitlab</span>
            </button>
          </div>
        </div>
      </form>

      <form
        action="/api/auth/basecamp"
        method="GET"
        class="field"
      >
        <div class="field">
          <div class="control">
            <button class="button is-success is-rounded is-fullwidth">
              <span class="icon">
                <svg>
                  <use href="/svg/feather-sprite.svg#globe" />
                </svg>
              </span>
              <span>Use Basecamp</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {},
  },
};
</script>
