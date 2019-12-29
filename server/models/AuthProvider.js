const Model = require('./BaseModel');

class AuthProvider extends Model {
  static get tableName() {
    return 'auth_providers';
  }
}

module.exports = AuthProvider;
