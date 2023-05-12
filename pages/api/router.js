const express = require('express');
const router = express.Router();
const { generateInfo } = require('./generateInfo');

router.options('/generateInfo', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.setHeader("Access-Control-Allow-Methods", "POST")
   res.sendStatus(200)
})

router.post('/generateInfo', generateInfo);

module.exports = router;