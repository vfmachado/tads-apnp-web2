const Router = require('express').Router;

const router = Router();


const PollController = require('../controllers/PollController');
const VoteController = require('../controllers/VoteController');

router.post('/poll', PollController.create);
router.get('/poll/:id', PollController.getPoll);

router.post('/vote/:pollid', VoteController.addVote);

module.exports = router;