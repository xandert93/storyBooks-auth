const { Router } = require('express');
const router = Router();
const {
  renderLoginPage,
  renderDashboard,
} = require('../controllers/indexController');

router.get('/', renderLoginPage);

router.get('/dashboard', renderDashboard);

module.exports = router;
