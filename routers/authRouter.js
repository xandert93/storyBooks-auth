const { Router } = require('express');
const router = Router();
const {
  authenticateOnGoogle,
  authenticateWithGoogle,
  logoutUser,
} = require('../controllers/authController');

router.get('/google', authenticateOnGoogle);

router.get('/google/callback', authenticateWithGoogle);

router.get('/logout', logoutUser);

module.exports = router;
