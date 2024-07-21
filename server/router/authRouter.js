
const express = require('express');
const router = express.Router();

const { signUp, signIn, getFeature ,adminFeature,getPhoto } = require('../controller/authController');
const { withAuth } = require('../middleware');

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/feature', withAuth, getFeature);
router.post('/adminFeature',withAuth,adminFeature);
router.post('/photo', withAuth,getPhoto);

module.exports = router;
