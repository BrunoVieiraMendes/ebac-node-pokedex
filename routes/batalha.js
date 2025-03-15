const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
    console.log(Math.random());
    res.send({});
});


module.exports = router;