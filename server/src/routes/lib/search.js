const router = require('express').Router();
const model = require('../../models').Film;
const config = require('../../config');

router.get('/searchByActor', async (req, res) => {
    let page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    let limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : config.PAGINATION_LIMIT;
    try {
        let films = await model.paginate({
            actors: {
                $in: new RegExp(req.query.actorName, "i")
            }
        }, {
            page: page,
            limit: limit
        });
        return res.status(200).json(films);
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
});

router.get('/searchByName', async (req, res) => {
    let page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    let limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : config.PAGINATION_LIMIT;
    try {
        let films = await model.paginate({
            name: {
                $regex: `.*${req.query.name}.*`,
                $options: 'i'
            }
        }, {
            page: page,
            limit: limit
        });
        return res.status(200).json(films);
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
});

module.exports.router = router;
