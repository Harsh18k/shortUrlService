const express = require('express');
const { handleGenerateNewShortURL, handleGetURLInfo, handleUrlAnalytics } = require('../controllers/url');
const router = express.Router();
router.post('/', handleGenerateNewShortURL);
router.get('/:shortId',handleGetURLInfo);
router.get('/analytics/:shortId',handleUrlAnalytics )
module.exports = router;