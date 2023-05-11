const express = require('express');
const router = express.Router();
const { generateInfo } = require('./generateInfo');

router.post('/generateInfo', generateInfo);

module.exports = router;