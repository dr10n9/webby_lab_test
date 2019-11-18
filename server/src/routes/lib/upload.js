const IncomingForm = require('formidable').IncomingForm;
const router = require('express').Router();
const fs = require('fs');
const papaParse = require('papaparse');
const model = require('../../models').Film;

router.post('/', (req, res) => {
    let form = new IncomingForm();
    form.on('file', (field, file) => {
        console.log(file.path);
        fs.readFile(file.path, 'utf-8', (err, data) => {
            papaParse.parse(data, {
                complete: async (data) => {
                    // console.log(data);
                    for(let film of data.data) {
                        console.log(film);
                        try {
                            film.actors = film.actors.split(', ');
                            await model.create(film);                            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    fs.unlink(file.path, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log('deleted');
                            return res.status(200).json({
                                mes: 'processed'
                            });
                        }
                    })
                },
                error: (err) => {
                    console.log(err);
                },
                header: true,
                dynamicTyping: true,
            });
        });
    });

    form.on('end', () => {});

    form.on('error', (err) => {
        console.log(err);
    });

    form.on('aborted', () => {
        console.log('aborted');
    });

    form.parse(req);
});

module.exports.router = router;
