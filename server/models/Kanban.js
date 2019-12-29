const Model = require('./BaseModel');
const DateFormat = require('date-fns/format');

class Kanban extends Model {
  static get tableName() {
    return 'kanbans';
  }

  static get relationMappings() {
    return {
      size: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Size'),
        join: {
          from: 'kanbans.size_id',
          to: 'sizes.id',
        },
      },
      assigned: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./User'),
        join: {
          from: 'kanbans.assigned_id',
          to: 'users.id',
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./User'),
        join: {
          from: 'kanbans.id',
          through: {
            from: 'kanban_user.kanban_id',
            to: 'kanban_user.user_id',
          },
          to: 'users.id',
        },
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    ['backlog', 'develop', 'feedback', 'done'].forEach(key => {
      if (json[key]) {
        json[key] = DateFormat(json[key], 'YYYY-MM-DD');
      }
    });

    if (json.body) {
      json.body = JSON.stringify(json.body);
    }

    return json;
  }
}

module.exports = Kanban;
