const passport = require('passport');
const { body, validationResult } = require('express-validator');

// GET login page
const loginPageGet = async (req, res) => {
  try {
    res.render('index', { title: 'Login Page' });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).send('Internal Server Error');
  }
};

// Input validation middleware
const validateUser = [
  // Email validation
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  // Password validation
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('You must type a password')
    .trim()
    .escape(),
];

// POST login handler
const loginPagePost = [
  // Validation middleware
  validateUser,

  // Main route handler
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, render them
      return res.status(400).render('index', {
        title: 'Login',
        errors: errors.array(),
      });
    }

    // Handle login via passport
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Pass error to Express error handler
      }
      if (!user) {
        // If user is not found, render with a standardized error message
        return res.render('index', {
          title: 'Login Page',
          errors: [{ msg: info.message || 'Invalid email or password' }],
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Set user session and redirect to dashboard
        req.session.userId = user.id;
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  },
];

// GET logout handler
const logoutGet = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};

module.exports = { loginPageGet, loginPagePost, logoutGet };
