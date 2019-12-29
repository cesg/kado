const Model = require('./BaseModel');

class SizeStat extends Model {
  static get tableName() {
    return 'sizes_stats';
  }

  static get relationMappings() {
    return {
      size: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./Size'),
        join: {
          from: 'sizes_stats.size_id',
          to: 'sizes.id',
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
}

module.exports = SizeStat;
