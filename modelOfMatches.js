const Sequelize = require('sequelize');
const server = require('./server');

function matchData(server){
let match = server.define('matches', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    season: Sequelize.STRING,
    city: Sequelize.STRING,
    date: Sequelize.STRING,
    team1: Sequelize.STRING,
    team2: Sequelize.STRING,
    toss_winner: Sequelize.STRING,
    toss_decision: Sequelize.STRING,
    result: Sequelize.STRING,
    dl_applied: Sequelize.STRING,
    winner: Sequelize.STRING,
    win_by_runs: Sequelize.STRING,
    win_by_wickets: Sequelize.STRING,
    player_of_match: Sequelize.STRING,
    venue: Sequelize.STRING,
    umpire1: Sequelize.STRING,
    umpire2: Sequelize.STRING,
    umpire3: Sequelize.STRING
  });
  return match;
}
  module.exports.matchData=matchData;

