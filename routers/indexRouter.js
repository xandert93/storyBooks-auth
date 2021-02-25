const { Router } = require('express');
const router = Router();
const {
  renderLoginPage,
  renderDashboard,
} = require('../controllers/indexController');

const { ensureAuth, ensureGuest } = require('../middlewares/auth.js');

router.get('/', ensureGuest, renderLoginPage);

router.get('/dashboard', ensureAuth, renderDashboard);

module.exports = router;
