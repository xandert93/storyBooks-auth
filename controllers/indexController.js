const Story = require('../models/Story.js');

exports.renderLoginPage = (req, res) => {
  res.render('login', { layout: 'login' });
};

exports.renderDashboard = async (req, res) => {
  try {
    const foundStories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      firstName: req.user.firstName,
      stories: foundStories,
    });
  } catch (err) {
    res.render('errors/500');
  }
};
