const { Router } = require('express');
const router = Router();
const {
  renderAddStoryPage,
  renderEditStoryPage,
  renderPublicStoriesPage,
  renderFullStoryPage,
  renderUserStoriesPage,
  updateStory,
  deleteStory,
  createStory,
} = require('../controllers/storiesController');

const { ensureAuth } = require('../middlewares/auth.js');

router.get('/add', ensureAuth, renderAddStoryPage);

router.route('/').get(ensureAuth, renderPublicStoriesPage).post(createStory);

router.get('/user/:userId', renderUserStoriesPage);

router
  .route('/:id')
  .get(renderFullStoryPage)
  .put(updateStory)
  .delete(deleteStory);

router.get('/edit/:id', ensureAuth, renderEditStoryPage);

module.exports = router;
