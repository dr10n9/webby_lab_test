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
            // film.actors = film.actors.join(', ');
            return res.status(200).json(film);
        } catch (error) {
            console.log(error);
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
    console.log(req.query)
    try {
        let options = {
            select: '-actors -_id -yearOfIssue',
            page: page,
            limit: limit
        }
        if (config.parseBoolean(req.query.sort)) {
            options.collation = {
                locale: 'en'
            };
            options.sort = {
                name: 1
            };
        }
        console.log(options);
        let list = await model.paginate({}, options);
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
    console.log(req.body);

    req.body.name = req.body.name.trim();
    req.body.format = req.body.format.trim();
    req.body.actors = config.sortActors(req.body.actors.split(',').map(el => el.trim()));
    try {
        let check = await model.findOne(req.body);
        if (check != undefined) return res.status(409).json({
            err: 'This film already exists',
            film: check
        })
    } catch (error) {
        console.log(err);
    }
    try {
        console.log(req.body);
        let film = await model.create({
            name: req.body.name,
            format: req.body.format,
            yearOfIssue: req.body.yearOfIssue,
            actors: req.body.actors
        });
        return res.json(film);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error
        });
    }
});

router.patch('/:id', async (req, res) => {
    if (parseInt(req.params.id)) {
        delete req.body.id;
        req.body.name = req.body.name.trim();
        req.body.format = req.body.format.trim();
        req.body.actors = config.sortActors(req.body.actors.split(',').map(el => el.trim()));
        try {
            let check = await model.findOne(req.body);
            console.log(`PATCH /${req.params.id}`);
            console.log('CHECK:', check, '\nreq.body: ', req.body);
            if (check != undefined) return res.status(409).json({
                err: 'This film already exists',
                film: check
            })
        } catch (error) {
            console.log(err);
        }
        let film = await model.findOneAndUpdate({
            film_id: req.params.id
        }, req.body);
        if (film == undefined) {
            return res.status(404).json({
                mes: `no film with id = ${req.params.id}`
            });
        }
        console.log(film);
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