const Sequelize = require('sequelize');
const server = require('./server');
let sequelize=server.Connection();
const matchfile=require("./modelOfMatches.js")
let Match=matchfile.matchData(sequelize)
function deliveryData(){
let delivery = sequelize.define('deliveries', {
    match_id: {
      type: Sequelize.STRING,
      references: {
        model: Match,
        key: 'id'
      }
    },
    inning: Sequelize.STRING,
    bowling_team: Sequelize.STRING,
    over: Sequelize.STRING,
    ball: Sequelize.STRING,
    batsman: Sequelize.STRING,
    non_striker: Sequelize.STRING,
    bowler: Sequelize.STRING,
    is_super_over: Sequelize.STRING,
    wide_runs: Sequelize.STRING,
    bye_runs: Sequelize.STRING,
    legbye_runs: Sequelize.STRING,
    noball_runs: Sequelize.STRING,
    penalty_runs: Sequelize.STRING,
    batsman_runs: Sequelize.STRING,
    extra_runs: Sequelize.STRING,
    total_runs: Sequelize.STRING,
    player_dismissed: Sequelize.STRING,
    dismissal_kind: Sequelize.STRING,
    fielder: Sequelize.STRING
  });
  return delivery;
}
  module.exports.deliveryData=deliveryData;

