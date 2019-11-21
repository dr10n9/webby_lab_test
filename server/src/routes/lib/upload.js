const IncomingForm = require('formidable').IncomingForm;
const router = require('express').Router();
const fs = require('fs');
const papaParse = require('papaparse');
const model = require('../../models').Film;
const sortActors = require('../../config').sortActors;


router.post('/', (req, res) => {
    let form = new IncomingForm();
    form.uploadDir = __dirname;
    form.on('file', (field, file) => {
        console.log(file.path);
        fs.readFile(file.path, 'utf-8', (err, data) => {
            papaParse.parse(data, {
                complete: async (data) => {
                    console.log(data);
                    let response = [];
                    for (let film of data.data) {
                        let tmp = {
                            name: film.name.trim(),
                            format: film.format.trim(),
                            actors: sortActors(film.actors.split(',').map(el => el.trim())),
                            yearOfIssue: film.yearOfIssue
                        }
                        try {
                            let check = await model.findOne(tmp);
                            if(check != undefined) {
                                response.push({
                                    film: check,
                                    created: false,
                                    reason: 'exists'
                                });
                                console.log(film, 'exists');
                            } else {
                                tmp.yearOfIssue = film.yearOfIssue
                                try {
                                    let res = await model.create(tmp);
                                    response.push({
                                        film: res,
                                        created: true
                                    });
                                    console.log(film, 'created');
                                } catch (error) {
                                    return res.status(500).json({
                                        err: error
                                    });
                                }
                            }
                        } catch (err) {
                            return res.status(500).json({
                                err: err
                            });
                        }
                    }
                    fs.unlink(file.path, (err) => {
                        if (err) console.log(err);
                        else {
                            console.log('deleted');
                            return res.status(200).json({
                                result: response,
                                created: `${response.filter(el => el.created).length}/${response.length}`
                                // mes: 'processed'
                            });
                        }
                    })
                },
                error: (err) => {
                    console.log(err);
                    return res.status(500).json({
                        err: 'PapaParse error: ' + err
                    });
                },
                header: true,
                dynamicTyping: true,
            });
        });
    });

    form.on('end', () => { });

    form.on('error', (err) => {
        console.log(err);
    });

    form.on('aborted', () => {
        console.log('aborted');
    });

    form.parse(req);
});

module.exports.router = router;
