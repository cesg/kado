<template>
  <form
    id="form_kanban"
    @submit.prevent="persist"
  >
    <div class="field">
      <div class="control">
        <label
          for="input_name"
          class="label"
        >
          Nombre
        </label>
        <input
          id="input_name"
          v-model="form.name"
          type="text"
          class="input"
          required
        >
      </div>
    </div>
    <div
      class="is-divider"
      data-content="STEP"
    />
    <div class="field">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="input_step"
            v-model.number="form.step_id"
          >
            <option value="1">
              Backlog
            </option>
            <option value="2">
              Develop
            </option>
            <option value="3">
              Feedback
            </option>
            <option value="4">
              Done
            </option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="is-divider"
      data-content="SIZE"
    />
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <input
          id="input_size_xs"
          v-model="form.size_id"
          class="is-checkradio"
          type="radio"
          value="1"
        >
        <label for="input_size_xs">XS</label>
      </div>
      <div class="control">
        <input
          id="input_size_s"
          v-model="form.size_id"
          class="is-checkradio"
          type="radio"
          value="2"
        >
        <label for="input_size_s">S</label>
      </div>
      <div class="control">
        <input
          id="input_size_m"
          v-model="form.size_id"
          class="is-checkradio"
          type="radio"
          value="3"
        >
        <label for="input_size_m">M</label>
      </div>
      <div class="control">
        <input
          id="input_size_l"
          v-model="form.size_id"
          class="is-checkradio"
          type="radio"
          value="4"
        >
        <label for="input_size_l">L</label>
      </div>
      <div class="control">
        <input
          id="input_size_xl"
          v-model="form.size_id"
          class="is-checkradio"
          type="radio"
          value="5"
        >
        <label for="input_size_xl">XL</label>
      </div>
    </div>
    <div
      class="is-divider"
      data-content="TOUCH"
    />
    <div class="field">
      <div class="control">
        <input
          v-model="form.touch"
          type="number"
          class="input"
          min="0"
          max="200"
        >
      </div>
    </div>
    <div
      class="is-divider"
      data-content="ASSIGNED"
    />
    <div class="field">
      <div class="control">
        <div class="select is-fullwidth">
          <select
            id="input_assigned_id"
            v-model="form.assigned_id"
            name="assigned_id"
          >
            <option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
              v-text="user.name"
            />
          </select>
        </div>
      </div>
    </div>
    <div
      class="is-divider"
      data-content="DATES"
    />
    <div class="field">
      <div class="control">
        <label
          for="input_backlog"
          class="label"
        >
          Backlog
        </label>
        <input
          id="input_baclog"
          :value="form.backlog"
          type="date"
          class="input"
          @change="setDate('backlog', $event.target.value)"
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label
          for="input_develop"
          class="label"
        >
          Develop
        </label>
        <input
          id="input_develop"
          :value="form.develop"
          type="date"
          class="input"
          name="develop"
          @change="setDate('develop', $event.target.value)"
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label
          for="input_feedback"
          class="label"
        >
          Feedback
        </label>
        <input
          id="input_feedback"
          :value="form.feedback"
          type="date"
          class="input"
          name="feedback"
          @change="setDate('feedback', $event.target.value)"
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label
          for="input_done"
          class="label"
        >
          Done
        </label>
        <input
          id="input_done"
          :value="form.done"
          type="date"
          class="input"
          name="done"
          @change="setDate('done', $event.target.value)"
        >
      </div>
    </div>
  </form>
</template>

<script>
import Xhr from '../../xhr';
import Format from 'date-fns/format';

const formNull = {
  name: '',
  reporter_id: 1,
  assigned_id: null,
  step_id: 1,
  size_id: 1,
  touch: 0,
  backlog: null,
  develop: null,
  feedback: null,
  done: null,
};

export default {
  props: {
    kanban: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      form: { ...formNull },
    };
  },

  computed: {
    users() {
      return this.$store.state.users;
    },
  },

  watch: {
    kanban: {
      handler: 'fillForm',
    },
  },

  created() {
    this.$store.dispatch('fetchUsers');
  },

  methods: {
    setDate(field, dateString) {
      this.form[field] = dateString.length ? Format(dateString, 'YYYY-MM-DD') : null;
    },

    reset() {
      this.form = { ...formNull };
    },

    fillForm(kanban) {
      if (!kanban) {
        return this.reset();
      }

      Object.keys(this.form).forEach(key => {
        let value = kanban[key];
        if (['backlog', 'develop', 'feedback', 'done'].includes(key)) {
          value = value ? Format(value, 'YYYY-MM-DD') : null;
        }
        this.$set(this.form, key, value);
      });
    },

    toggeLoading() {
      const submit = document.querySelector('[form="form_kanban"]');
      if (submit) {
        submit.classList.toggle('is-loading');
      }
    },

    async persist({ target }) {
      this.toggeLoading();
      const { data } = await Xhr.request({
        url: this.kanban.id ? `kanbans/${this.kanban.id}` : 'kanbans',
        method: this.kanban.id ? 'PATCH' : 'POST',
        data: this.form,
      });
      this.toggeLoading();
      this.$emit('form-submit', data);
    },
  },
};
</script>
