const Story = require('../models/Story.js');

exports.renderAddStoryPage = (req, res) => {
  res.render('stories/add');
};

exports.createStory = async (req, res) => {
  try {
    const newStory = await new Story({ ...req.body, user: req.user.id }).save();
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.render('errors/500');
  }
};

exports.renderPublicStoriesPage = async (req, res) => {
  try {
    const foundStories = await Story.find({ status: 'public' })
      .populate('user') //populate stories documents with User model shit
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', { stories: foundStories });
  } catch (err) {
    console.log(err);
    res.render('errors/500');
  }
};

exports.renderUserStoriesPage = async (req, res) => {
  try {
    const foundStories = await Story.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean();
    if (!foundStories) return res.render('errors/404');
    else return res.render('stories/index', { stories: foundStories });
  } catch (err) {
    return res.render('errors/500');
  }
};

exports.renderEditStoryPage = async (req, res) => {
  try {
    const foundStory = await Story.findById(req.params.id).lean();
    if (!foundStory) return res.render('errors/404');
    if (foundStory.user != req.user.id) return res.redirect('/stories');
    else res.render('stories/edit', { story: foundStory });
  } catch (err) {
    return res.render('errors/500');
  }
};

exports.updateStory = async (req, res) => {
  try {
    let updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    if (!updatedStory) return res.render('errors/404');
    if (updatedStory.user != req.user.id) return res.redirect('/stories');
    else return res.redirect('/stories');
  } catch (err) {
    console.log(err);
    res.render('errors/500');
  }
};

exports.deleteStory = async (req, res) => {
  try {
    let deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) return res.render('errors/404');
    if (deletedStory.user != req.user.id) return res.redirect('/stories');
    else return res.redirect('/dashboard');
  } catch (err) {
    res.render('errors/500');
  }
};

exports.renderFullStoryPage = async (req, res) => {
  try {
    const foundStory = await Story.findById(req.params.id)
      .populate('user')
      .lean();
    if (!foundStory) res.render('errors/404');
    if (foundStory.user._id != req.user.id && foundStory.status == 'private')
      res.render('errors/404');
    else res.render('stories/fullStory', { story: foundStory });
  } catch (err) {
    console.log(err);
    return res.render('errors/500');
  }
};
