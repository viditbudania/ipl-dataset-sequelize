const server = require('./server.js');
let sequelize=server.Connection();

const matchfile=require("./modelOfMatches.js")
let Match=matchfile.matchData(sequelize)

const deliveryFile=require("./modelOfdeliveries")
let Delivery=deliveryFile.deliveryData(sequelize)

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