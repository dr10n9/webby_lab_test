const router = require('express').Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        mes: 'api'
    });
})

router.use('/films', require('./film').router);
router.use('/search', require('./search').router);
router.use('/upload', require('./upload').router);

module.exports.router = router;