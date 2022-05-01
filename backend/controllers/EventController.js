const { json } = require("express");
//const { UUID } = require("sequelize/types");
const models = require("../models");
const { body } = require("express-validator");
const { event, user, wallet, currency, aposta, change } = require("../models");
var file = require("./test.json");

function sleep(ms) {
  console.log("sleeping");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.testing = async function (req, res) {
  var list = await event.findAll();
  //console.log(list)
  return res.status(200).json(list);
};

exports.addAPI = async function(req, res){
  var events = file.listEventsAll;
  for (let k in events) {
    const check = await event.findOne({where : {team1 : events[k].event.team1, status : "ongoing"}})

    if(check)
    {
      console.log("exists")
    }
    else
    {
    await event.create({
      sport: events[k].event.sport,
      type: events[k].event.type,
      team1: events[k].event.team1,
      team2: events[k].event.team2,
      odd1: events[k].event.result_odd.home,
      odd2: events[k].event.result_odd.tie,
      odd3: events[k].event.result_odd.away,
      status: "ongoing"
    });
    }
  }
}

exports.testing2 = async function (req, res) {
  //let events = json(file)

  console.log("here");
  // events.map((event, index) => (
  //   console.log("This is item number" + index +" : " + event)
  //   ));
  return res.status(200).json(file);
};

exports.registar = async function (req, res) {
  data = req.body.params;

  const curr = await currency.findOne();
  const curr2 = await currency.create({ name: "Euros" });
  const wallet2 = await wallet.create({ amount: "100", currency_id: curr2.id });
  data.wallet_id = wallet2.id;
  data.isAdmin = "false"
  const user2 = await user.create(data);
  return res.status(200).json(user2);
};

exports.login = async function (req, res) {
  const user2 = await user.findOne({
    where: { email: req.body.params.email, password: req.body.params.password },
    include: { model: wallet, as: "wallet" },
  });
  if (user2) {
    console.log("user exists");
    return res.status(200).json(user2);
  } else {
    console.log("user does not exist");
  }
  //const user2 = await user.create(req.body.params)
};

exports.fetch = async function (req, res) {
  const user2 = await user.findOne({
    where: { id: req.params.userid },
    include: {
      model: wallet,
      as: "wallet",
      include: { model: currency, as: "currency" },
    },
  });
  if (user2) {
    console.log("user exists");
    return res.status(200).json(user2);
  } else {
    console.log("user does not exist");
  }
};

exports.add = async function (req, res) {
  console.log(req.body.params)
  const user2 = await user.findOne({
    where: { id: req.body.params.user_id },
    include: {
      model: wallet,
      as: "wallet",
      include: { model: currency, as: "currency" },
    },
  });
  req.body.params.currency_id = user2.wallet.currency.id
  if (user2.wallet.amount < req.body.params.amount)
  {
    console.log("n tens creditos man")
    return res.status(200).json({msg : "Sem créditos suficientes"})
  }

  const aux2 =parseFloat(user2.wallet.amount)
  const aux3 =parseFloat(req.body.params.amount)
  final = aux2-aux3
  const bet = await aposta.create(req.body.params);
  wallet.update({amount : final}, {where:{  id : user2.wallet.id }})
  //user2.wallet.amout = user2.wallet.amount - req.body.params.
  console.log(bet);
  console.log(req.body.params);
  return res.status(200).json({msg : "sucesso"})
};

exports.checkAdmin = async function (req, res) {
  console.log(req.params)
  if(req.params.id == 'null')
  {
    console.log("not logged in")
    return res.status(200).json(false);
  }
  const user2 = await user.findOne({
    where: { id: req.params.id }});
  return res.status(200).json(user2.isAdmin);
};

exports.addEvent = async function (req, res) {
  req.body.params.type = "fulltime"
  req.body.params.status= "ongoing"
  const newEvent = await event.create(req.body.params)
  return res.status(200).json(newEvent);
};

exports.addResultado = async function (req, res) {
  const event2 = await event.findOne({where : {id : req.body.params.event_id}})
  event.update({result : req.body.params.winner, status : "ended"}, {where :{id : event2.id}})

  console.log(event2.id)
  const bets = await aposta.findAll({where : {event_id : event2.id}})
  //console.log(bets)
  for(let k in bets)
  {
    if (bets[k].equipa_apostada == req.body.params.winner)
    {
      const user2 = await user.findOne({
        where: { id: bets[k].user_id },
        include: {
          model: wallet,
          as: "wallet",
          include: { model: currency, as: "currency" },
        },
      });
      

      const aux1 =parseFloat(user2.wallet.amount)
      const aux2 =parseFloat(bets[k].amount)
      const aux3 =parseFloat(event2.odd3)
      let profit = aux1 + (aux2*aux3)

      if(bets[k].currency_id == user2.wallet.currency_id)
      {
        if(event2.result == "team2")
        {
          wallet.update({amount: profit}, {where: {id : user2.wallet_id}})
        }
        else if(event2.result == "team1")
        {
          wallet.update({amount: user2.wallet.amount + (bets[k].amount* event2.odd3)}, {where: {id : user2.wallet_id}})
        }
        else
        {
          wallet.update({amount: user2.wallet.amount + (bets[k].amount* event2.odd3)}, {where: {id : user2.wallet_id}})
        }
      }
      else
      {
        const ratio = await change.findOne({where : {currency1_id : bets[k].currency_id, currency2_id: user2.wallet.currency_id}})
        const taxa = parseFloat(ratio.taxa)
        profit = profit * taxa

        if(event2.result == "team2")
        {
          wallet.update({amount: profit}, {where: {id : user2.wallet_id}})
        }
        else if(event2.result == "team1")
        {
          wallet.update({amount: user2.wallet.amount + (bets[k].amount* event2.odd3)}, {where: {id : user2.wallet_id}})
        }
        else
        {
          wallet.update({amount: user2.wallet.amount + (bets[k].amount* event2.odd3)}, {where: {id : user2.wallet_id}})
        }
      }

      
    }
  }

  return res.status(200).json({msg: "sucess"})

};

exports.deposit = async function (req, res) {

  const user2 = await user.findOne({where:{id : req.body.params.userid}, include: {model: wallet, as: "wallet"}})
  const curr = await currency.findOne({where: {name : req.body.params.currency}})

  if(user2.wallet.currency_id == curr.id)
  {
    console.log("match")
    const aux1 =parseFloat(user2.wallet.amount)
    const aux2 =parseFloat(req.body.params.amount)
    const profit = aux1 + aux2
    wallet.update({amount: profit}, {where: {id : user2.wallet_id}})
  }
  else
  {
    const change2 = await change.findOne({where:{ currency1_id: curr.id, currency2_id : user2.wallet.currency_id}})
    if(change2)
    {
      const aux1 =parseFloat(user2.wallet.amount)
      const aux2 =parseFloat(req.body.params.amount)
      const aux3 =parseFloat(change2.taxa)
      const profit = aux1 + (aux2 * aux3)
      console.log(profit)
      wallet.update({amount: profit}, {where: {id : user2.wallet_id}})
    }
  }
  return res.status(200).json();
};


exports.convert = async function (req, res) {

  const user2 = await user.findOne({where:{id : req.body.params.userid}, include: {model: wallet, as: "wallet"}})
  const curr = await currency.findOne({where: {name : req.body.params.currency}})

  const change2 = await change.findOne({where:{ currency1_id: user2.wallet.currency_id, currency2_id : curr.id}})
  if(change2)
  {
    const aux1 =parseFloat(user2.wallet.amount)
    const aux3 =parseFloat(change2.taxa)
    const profit = aux1 * aux3
    console.log(profit)
    wallet.update({amount: profit, currency_id : curr.id}, {where: {id : user2.wallet_id}})
  }
  
  return res.status(200).json();
};


exports.fetch = async function (req, res) {
  const user2 = await user.findOne({
    where: { id: req.params.userid },
    include: {
      model: wallet,
      as: "wallet",
      include: { model: currency, as: "currency" },
    },
  });
  if (user2) {
    console.log("user exists");
    return res.status(200).json(user2);
  } else {
    console.log("user does not exist");
  }
};


exports.listApostas = async function (req, res) {
  const user2 = await user.findOne({
    where: { id: req.params.id }});


  const bets = await aposta.findAll({where : {user_id : user2.id}, include : {model: event, as: "event"}})
  //console.log(bets)
  return res.status(200).json(bets);
};

exports.updateOdds = async function (req, res) {
  const eve = await event.findOne({where : {id : req.params.id}})

  console.log(req.body.params)
  event.update({odd1 : req.body.params.odd1Input, odd2 : req.body.params.odd2Input, odd3 : req.body.params.odd3Input}, {where: {id : eve.id}})

  return res.status(200).json()


};