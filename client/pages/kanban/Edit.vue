<template>
  <section>
    <div class="field is-flex content-between">
      <router-link
        class="level-item is-flex"
        :to="{ path: urlPrev }"
      >
        <span class="icon">
          <svg>
            <use href="/svg/feather-sprite.svg#arrow-left-circle" />
          </svg>
        </span>
        <span>Back</span>
      </router-link>
      <button
        form="form_kanban"
        class="button is-small is-text level-item"
        :class="{'is-success': formChange}"
        :disabled="!formChange"
      >
        <span class="icon">
          <svg>
            <use href="/svg/feather-sprite.svg#save" />
          </svg>
        </span>
        <span>Save</span>
      </button>
    </div>
    <div class="columns">
      <div class="column">
        <label class="label">
          Explains this kanban
        </label>
        <div
          id="codex-editor"
          class="box has-background-white is-size-7"
        />
      </div>
      <div class="column">
        <div class="box is-shadowless">
          <kanban-form
            :kanban="kanban"
            @form-submit="formChange = false"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Xhr from '../../xhr';
import KanbanForm from '../../components/form/KanbanForm';
import EditorJS from '@editorjs/editorjs';
import Checklist from '@editorjs/checklist';
import Header from '@editorjs/header';
import debounce from 'lodash.debounce';
import Notyf from '../../notyf';

export default {
  components: {
    KanbanForm,
  },

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      kanban: {},
      edited: false,
      formChange: false,
    };
  },

  computed: {
    urlPrev() {
      switch (this.kanban.step_id) {
        case 1:
          return '/kanbans-backlog';
        case 2:
          return '/kanbans-develop';
        case 3:
          return '/kanbans-feedback';
        case 4:
          return '/kanbans-done';

        default:
          return '/';
      }
    },
  },

  beforeDestroy() {
    if (this.edited) {
      this.save();
    }
  },

  mounted() {
    this.fetch();
    const formKanban = document.getElementById('form_kanban');
    formKanban.addEventListener('change', () => {
      this.formChange = true;
    });
  },

  methods: {
    initEditor(data) {
      this.$options.onChange = debounce(() => {
        this.save();
      }, 4500);

      data = data ? JSON.parse(data) : {};
      this.$options.editor = new EditorJS({
        onChange: this.$options.onChange,
        autofocus: false,
        holder: 'codex-editor',
        tools: {
          header: Header,
          checklist: {
            class: Checklist,
          },
        },
        data,
      });
    },

    async fetch() {
      const { data } = await Xhr.get(`kanbans/${this.id}`);
      this.kanban = data;
      this.initEditor(data.body);
    },

    async save() {
      const body = await this.$options.editor.save();
      await Xhr.patch(`kanbans/${this.id}`, { body });
      Notyf.open({
        type: 'success',
        message: 'Saved',
      });
    },
  },
};
</script>
