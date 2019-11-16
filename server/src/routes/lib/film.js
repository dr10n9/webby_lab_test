const router = require('express').Router();
const model = require('../../models').Film;
const config = require('../../config');

router.get('/:id', async (req, res) => {
    if (parseInt(req.params.id)) {
        try {
            let film = await model.findOne({
                film_id: req.params.id
            });
            if (film == undefined) return res.status(404).json({
                mes: `no film with id = ${req.params.id}`
            });
            return res.status(200).json(film);
        } catch (error) {
            return res.status(500).json({
                error: error
            });
        }
    } else {
        return res.status(400).json({
            mes: `id must be specified or be positive integer`
        });
    }   
});

router.get('/', async (req, res) => {
    let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : config.PAGINATION_LIMIT;
    try {
        let list = await model.paginate({}, {
            select: '-actors',
            page: page,
            limit: limit
        });
        if (list.docs.length == 0) {
            return res.status(404).json({
                mes: 'wrong params or films doesn\'t exists'
            });
        } else {
            return res.status(200).json(list);
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
});

router.post('/', async (req, res) => {
    if(verifyFormat(req.body.format)) {
        try {
            let film = await model.create({
                name: req.body.name,
                format: req.body.format.trim(),
                yearOfIssue: req.body.yearOfIssue,
                actors: req.body.actors
            });
            console.log(req.body.yearOfIssue instanceof Date);
            return res.json(film);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            });
        }
    }
    return res.json({
        test: verifyFormat(req.body.format)
    })
});

router.patch('/:id', async (req, res) => {
    if(parseInt(req.params.id)) {
        if(req.body.format) {
            if(!verifyFormat(req.body.format)) return res.status(400).json({
                error: 'wrong format'
            });
        }
        let film = await model.findOneAndUpdate({
            film_id: req.params.id
        }, req.body);
        if(film == undefined) {
            return res.status(404).json({
                mes: `no film with id = ${req.params.id}`
            });
        }
        return res.status(200).json(film);
    } else {
        return res.status(500).json({
            error: error
        });
    }
});

router.delete('/:id', async (req, res) => {
    if (parseInt(req.params.id) == NaN) return res.status(400).json({
        mes: 'wrong id syntax'
    });
    try {
        let film = await model.findOneAndDelete({
            film_id: req.params.id
        });
        if (film == null) {
            return res.status(404).json({
                mes: `no film with id = ${req.params.id}`
            })
        } else {
            return res.status(200).json({
                mes: 'deleted',
                film: film
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: error
        })
    }
});

function verifyFormat(format) {
    format = format.trim();
    return format == 'DVD' || format == 'VHS' || format == 'Blu-Ray'
}

module.exports.router = router;