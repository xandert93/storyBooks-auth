exports.renderLoginPage = (req, res) => {
  res.render('login', { layout: 'login' });
};
exports.renderDashboard = (req, res) => {
  res.render('dashboard');
};
