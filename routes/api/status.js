const express = require('express');

const router = express.Router();

const middleeare = (req, res, next) => {
    console.log("tenho acesso a toda a req", req);

    next(); 
};

router.get('/', middleeare, (_req, res) => {
    console.log("respondendo ao usuario");
    res.json({
        status: "ok",
    });
});

module.exports = router;