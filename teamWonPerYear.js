const server = require('./server.js');
let sequelize=server.Connection();
const matchfile=require("./modelOfMatches.js")
let Match=matchfile.matchData(sequelize)

Match.findAll({
  attributes: [ 'season' ,'winner', [sequelize.fn('COUNT', sequelize.col('winner')), 'count']], group :['season','winner']
 }).then(data=>{
 console.log(data);
});
