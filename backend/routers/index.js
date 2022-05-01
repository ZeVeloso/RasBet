const EventController = require("../controllers/EventController");
const CurrenciesController = require("../controllers/CurrenciesController")
var express = require('express');
var router = express.Router();
//const Router = require("./Router");



/* GET home page. */

router.get('/testing', EventController.testing); 
router.post('/registar', EventController.registar); 
router.get('/user/:userid', EventController.fetch); 
router.post('/login', EventController.login); 
router.get('/currencies', CurrenciesController.list); 
router.post('/currencies', CurrenciesController.create); 
router.post('/addBet', EventController.add); 
router.get('/changes/:id', CurrenciesController.fetchChanges); 
router.post('/changes/add', CurrenciesController.addChanges); 
router.get('/user/check/:id', EventController.checkAdmin); 
router.get('/apostas/:id', EventController.listApostas); 
router.put('/apostas/:id', EventController.updateOdds); 

router.post('/events/add', EventController.addEvent); 
router.post('/events/add/result', EventController.addResultado); 

router.post('/user/deposit', EventController.deposit); 
router.post('/user/convert', EventController.convert); 
router.post("/getAPI", EventController.addAPI)

module.exports = router;
