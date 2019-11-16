const router = require('express').Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        mes: 'api'
    });
})

module.exports.router = router;