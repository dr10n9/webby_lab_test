const app = require("../app").app;
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const mongoose = require('mongoose');
const config = require('../config');
const fs = require('fs');


chai.use(chaiHttp);

before(done => {
    app.listen(config.PORT, async (err) => {
        if (err) {
            console.log(err);
        } else {
            try {
                await mongoose.connect(config.DATABASE_URI, {
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                });
                done()
            } catch (error) {
                console.log('err', err);
            }
        }
    })
});



describe("Server", () => {
    it("api", done => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        done();
    });
});

describe("Films", () => {
    it('/GET films', done => {
        chai.request(app)
            .get('/api/films')
            .end((err, res) => {
                if (err) console.log('get films err:', err);
                else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.docs).to.be.a('array');
                    expect(res.body.page).to.be.a('number');
                }
            });
        done();
    });

    it('POST /films', done => {
        let testFilm = {
            name: 'FilmName',
            yearOfIssue: 2019,
            format: 'Blu-Ray',
            actors: 'Actor 1, Actor 2'
        }
        chai.request(app)
            .post('/api/films')
            .send(testFilm)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.actors).to.be.a('array');
                expect(res.body).to.have.property('film_id');
                return done();
            })
    });

    it('GET /api/films/:id', done => {
        chai.request(app)
            .get('/api/films/2')
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        chai.request(app)
            .get('/api/films/aa')
            .end((err, res) => {
                expect(res).to.have.status(400);
            });

        chai.request(app)
            .get('/api/films/-1')
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        chai.request(app)
            .get('/api/films/100000000')
            .end((err, res) => {
                expect(res).to.have.status(404);
            });
        done();
    });
});

describe('Search', () => {
    it('GET /search', done => {
        chai.request(app)
            .get('/api/search/searchByName?name=test&page=2&limit=2')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.docs).to.be.a('array');
            })

        chai.request(app)
            .get('/api/search/searchByActor?actorName=actor&page=2&limit=2')
            .end((err, res) => {
                console.log(__dirname);
                expect(res).to.have.status(200);
                expect(res.body.docs).to.be.a('array');
            });
        done();
    });
});

describe('Upload', () => {
    it('POST /upload', done => {
        let supertest = require('supertest');
        let request = supertest(app);
        request.post('/api/upload')
            .attach('file', '../example.csv')
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
        done();
    });
});

after(() => {
    process.exit(0);
})
