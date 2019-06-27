const server = require('./server.js');
let sequelize=server.Connection();

const matchfile=require("./modelOfMatches.js")
let Match=matchfile.matchData(sequelize)

const deliveryFile=require("./modelOfdeliveries")
let Delivery=deliveryFile.deliveryData(sequelize)

Delivery.belongsTo(Match,{foreignKey:'match_id'})
Delivery.findAll({
  include: [{
    model: Match,
    where: {season: '2016' },
    require:true,
    attributes: []
}],
raw: true, 
attributes:['bowling_team',[sequelize.fn('sum', sequelize.col('extra_runs')), 'sum'] ],group :['bowling_team']
}).then(data=>{
  console.log(data);
})
