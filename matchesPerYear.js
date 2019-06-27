const server = require('./server.js');
let sequelize=server.Connection();
const matchfile=require("./modelOfMatches.js")
let Match=matchfile.matchData(sequelize)

Match.findAll({
      attributes: [ 'season' , [sequelize.fn('COUNT', sequelize.col('Id')), 'count']], group :['season']
     }).then(data=>{
     console.log(data);
    });
