const Model = require('./BaseModel');

class Size extends Model {
  static get tableName() {
    return 'sizes';
  }
}

module.exports = Size;
