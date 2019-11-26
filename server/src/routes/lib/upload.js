const router = require('express').Router();
const papaParse = require('papaparse');
const model = require('../../models').Film;
const sortActors = require('../../config').sortActors;

const muter = require('multer');
const upload = muter();

router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file.buffer.toString());
    if(req.file == undefined) return res.status(400).json({
        err: 'no file'
    });

    papaParse.parse(req.file.buffer.toString(), {
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
                    if (check != undefined) {
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
            return res.status(200).json({
                result: response,
                created: `${response.filter(el => el.created).length}/${response.length}`
            });
        },
        error: (err) => {
            console.log(err);
            return res.status(500).json({
                err: 'PapaParse error: ' + err
            });
        },
        header: true,
        dynamicTyping: true,
    })
});
module.exports.router = router;
