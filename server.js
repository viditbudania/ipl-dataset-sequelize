function Connection(){
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ipl', 'root', 'test123', {
  host: 'localhost',
  query: {
    raw: true
  },
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

  return sequelize
}
module.exports.Connection=Connection;

