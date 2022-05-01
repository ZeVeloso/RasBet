const { json } = require("express");
//const { UUID } = require("sequelize/types");
const models = require("../models")
const { body } = require('express-validator');
const {event, user, wallet, currency, change} = require("../models")
var file = require('./test.json');

function sleep(ms) {
  console.log("sleeping")
    return new Promise(resolve => setTimeout(resolve, ms));
  }

exports.testing = async function(req,res){
    var events =file.listEventsAll
    for (let k in events)
    {
      // await event.create({sport : events[k].event.sport,
      // type : events[k].event.type,
      // team1 : events[k].event.team1,
      // team2 : events[k].event.team2,
      // odd1 : events[k].event.result_odd.home,
      // odd2 : events[k].event.result_odd.tie,
      // odd3 : events[k].event.result_odd.away })
    }
  console.log(file)
  return res.status(200).json(file);
}

exports.testing2 = async function(req,res){
  //let events = json(file)

  console.log("here")
  // events.map((event, index) => (
  //   console.log("This is item number" + index +" : " + event)
  //   )); 
  return res.status(200).json(file);
  
}

exports.registar = async function(req,res){

  console.log(req.body.params)
  data = req.body.params
  const curr = await currency.findOne();
  console.log(curr)
  //const curr2 = await currency.create({name : "Euros"})
  const wallet2 = await wallet.create({amount : "100", currency_id : "1"});
  data.wallet_id = wallet2.id
  const user2 = await user.create(data)
  return  res.status(200).json(user2)
}

exports.list = async function(req,res){

  const list = await currency.findAll()
  //console.log(list)
  return  res.status(200).json(list)
  //const user2 = await user.create(req.body.params)
}

exports.create = async function(req,res){

    const list = await currency.findOne({where : {name : req.body.params.name}})
    if (list != null)
    {
        return res.status(200).json({msg: "Already Exists"})
    }

    const created = await currency.create({name : req.body.params.name})
    return  res.status(200).json(created)
    //const user2 = await user.create(req.body.params)
  }


exports.fetchChanges = async function(req,res){

  console.log(req.params)
  const items = await change.findAll({where : {currency1_id : req.params.id}, include: {model : currency, as : "currency"}});

  return res.status(200).json(items);


}

exports.addChanges = async function(req,res){

  console.log(req.body.params)

  const exists = await currency.findOne({where : {name : req.body.params.curr2}})
  console.log(exists);

  const new1 = await change.create({taxa : req.body.params.taxa, currency1_id : req.body.params.curr1, currency2_id : exists.id, })

  return res.status(200).json({msg : "yes"});


}