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
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
let Match = sequelize.define('matches', {
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
})
let Delivery = sequelize.define('deliveries', {
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
})


//  Match.findAll({
//   attributes: [ 'season' , [sequelize.fn('COUNT', sequelize.col('Id')), 'count']], group :['season']
//  }).then(data=>{
//  console.log(data);
// });


// Match.findAll({
//   attributes: [ 'season' ,'winner', [sequelize.fn('COUNT', sequelize.col('winner')), 'count']], group :['season','winner']
//  }).then(data=>{
//  console.log(data);
// });


// Delivery.belongsTo(Match,{foreignKey:'match_id'})
// Delivery.findAll({
//   include: [{
//     model: Match,
//     where: {season: '2016' },
//     require:true,
//     attributes: []
// }],
// raw: true, 
// attributes:['bowling_team',[sequelize.fn('sum', sequelize.col('extra_runs')), 'sum'] ],group :['bowling_team']
// }).then(data=>{
//   console.log(data);
// })


Delivery.belongsTo(Match, {
  foreignKey: 'match_id'
})
Delivery.findAll({
  include: [{
    model: Match,
    where: {
      season: '2015'
    },
    attributes: []
  }],
  raw: true,
  attributes: ['bowler',
    [sequelize.fn('count', sequelize.literal('bowler')), 'count'],
    [sequelize.fn('sum', sequelize.literal('(total_runs-bye_runs-legbye_runs)*6')), 'sum'],
  ],
  group: ['bowler']
}).then(dataOfBowler => {
  var economyOfBowler = [];
  for (let bowler in dataOfBowler) { //console.log(dataOfBowler)
    economyOfBowler.push([dataOfBowler[bowler]['bowler'], dataOfBowler[bowler]['sum'] / dataOfBowler[bowler]['count']])
  }
  economyOfBowler.sort(function (a, b) {
    return a[1] - b[1];
  });
  for (let i = 0; i < 10; i++) {
    console.log(economyOfBowler[i]);
  }
})