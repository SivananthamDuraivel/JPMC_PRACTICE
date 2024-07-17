
const express = require('express');
const router = express.Router();

const { signUp, signIn, getFeature } = require('../controller/authController');
const { withAuth } = require('../middleware');

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/feature', withAuth, getFeature);

module.exports = router;
